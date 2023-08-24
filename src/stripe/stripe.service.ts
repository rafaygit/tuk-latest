import { Injectable, RawBodyRequest } from '@nestjs/common';
import { Stripe } from 'stripe';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { PaymentGatewayProvider } from '@prisma/client';
import { CreateTransactionMetaDto } from 'src/transaction-meta/dto/create-transaction-meta.dto';
import { TransactionMetaService } from 'src/transaction-meta/transaction-meta.service';
import { LicensesService } from 'src/licenses/licenses.service';
import { TemplatesService } from 'src/templates/templates.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { UpdateTransactionDto } from 'src/transactions/dto/update-transaction.dto';
@Injectable()
export class StripeService {
	private stripe: Stripe;

	constructor(private usersService: UsersService, private transactionsService: TransactionsService, private transactionMetasService: TransactionMetaService, private licenseService: LicensesService, private templateService: TemplatesService) {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: '2022-11-15'
		});
	}

	async createCheckoutSession(userId: number, licenseIds: number[], templateIds: number[]) {
		let line_items = [];

		if (licenseIds.length) {
			const licenses = await this.licenseService.findManyBySelection(licenseIds, ['name', 'price']);
			console.log(licenses);
			for (let license of licenses) {
				line_items.push({
					price_data: {
						currency: 'usd',
						unit_amount: license?.price * 100,
						product_data: {
							name: license?.name
						}
					},
					quantity: 1
				});
			}
		}
		if (templateIds.length) {
			const templates = await this.templateService.findManyBySelection(templateIds, ['name', 'price']);
			for (let template of templates) {
				line_items.push({
					price_data: {
						currency: 'usd',
						unit_amount: template?.price * 100,
						product_data: {
							name: template?.name
						}
					},
					quantity: 1
				});
			}
		}

		let licenseAmountSum = await this.licenseService.sumPriceByLicenseIds(licenseIds);
		let templateAmountSum = await this.templateService.sumPriceByTemplatesIds(templateIds);

		const session = await this.stripe.checkout.sessions.create({
			success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
			cancel_url: 'http://localhost:3000/cancel',
			mode: 'payment',
			line_items
		});

		const transactionDto: CreateTransactionDto = {
			method: PaymentGatewayProvider.STRIPE,
			userId: userId,
			paidStatus: false,
			amount: licenseAmountSum._sum.price + templateAmountSum._sum.price //sum of licenses and templates amount
		};
		const transaction = await this.transactionsService.create(transactionDto, licenseIds, templateIds);
		const transactionMetaDto: CreateTransactionMetaDto = {
			key: 'stripeSessionId',
			value: session.id,
			transactionId: transaction.id
		};
		await this.transactionMetasService.create(transactionMetaDto);

		return session.url;
	}

	async stripeSessionById(sessionId: string) {
		return await this.stripe.checkout.sessions.retrieve(sessionId);
	}

	async verifyPayment(sessionId: string) {
		const sessionInfo = await this.stripeSessionById(sessionId);
		if (sessionInfo.payment_status === 'paid') {
			this.onSuccess(sessionId);
			return true;
		}
		return false;
	}

	async retrieveSession(sessionId: string) {
		return this.stripe.checkout.sessions.retrieve(sessionId);
	}
	async handleWebhookEvent(request: RawBodyRequest<Request>) {
		const sig = request.headers['stripe-signature'];
		let event;
		try {
			event = this.stripe.webhooks.constructEvent(request.rawBody, sig, process.env.ENDPOINT_SECRET);
		} catch (err) {
			return err;
		}

		if (event.type === 'payment_intent.succeeded') {
			console.log('paid');
			await this.onSuccess(event?.data?.object?.id);
		} else if (event.type === 'payment_intent.payment_failed') {
			console.log('unpaid');
			await this.onFail(event?.data?.object?.id);
		}
	}

	async onSuccess(paymentIntentId: string) {
		let getSession = await this.stripe.checkout.sessions.list({ payment_intent: paymentIntentId });
		let sessionObject = getSession?.data?.find((sin) => sin.id);
		const transactionMeta = await this.transactionMetasService.findOneByKey('stripeSessionId', sessionObject?.id);
		const transaction = await this.transactionsService.findOne(transactionMeta.transactionId);
		const updateTransactionDto: UpdateTransactionDto = {
			paidStatus: true
		};
		await this.transactionsService.update(transaction.id, updateTransactionDto);
		const templateIds = transaction.templates.map((template) => template.id);
		const licenseIds = transaction.licenses.map((license) => license.id);
		if (transaction?.templates.length) {
			await this.usersService.attachTemplate(transaction.userId, templateIds);
		}
		if (transaction?.licenses.length) {
			await this.usersService.attachLicense(transaction.userId, licenseIds);
		}
	}
	async onFail(paymentIntentId: string) {
		let getSession = await this.stripe.checkout.sessions.list({ payment_intent: paymentIntentId });
		let sessionObject = getSession?.data?.find((sin) => sin.id);
		const transactionMeta = await this.transactionMetasService.findOneByKey('stripeSessionId', sessionObject?.id);

		const transaction = await this.transactionsService.findOne(transactionMeta.transactionId);

		const templateIds = transaction.templates.map((template) => template.id);
		const licenseIds = transaction.licenses.map((license) => license.id);

		if (transaction?.templates.length) {
			await this.usersService.detachTemplate(transaction.userId, templateIds);
		}

		if (transaction?.licenses.length) {
			await this.usersService.detachLicense(transaction.userId, licenseIds);
		}
	}
}

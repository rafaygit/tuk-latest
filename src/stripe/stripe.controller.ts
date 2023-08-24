import { Controller, Get, Post, Body, Query, Req, Res, RawBodyRequest } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { Request } from 'express';

@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
	constructor(private readonly stripeService: StripeService) {}

	@ApiOperation({
		description: 'Create checkout session.'
	})
	@Post('checkout')
	createCheckout(
		@Body()
		body: {
			userId: number;
			licenseIds: number[];
			templateIds: number[];
		}
	) {
		const { userId, licenseIds, templateIds } = body;
		return this.stripeService.createCheckoutSession(userId, licenseIds, templateIds);
	}

	@Get('verify-session')
	check(@Query('session_id') session_id: string) {
		return this.stripeService.stripeSessionById(session_id);
	}

	@Get('verify-payment')
	async verify(@Query('session_id') session_id: string) {
		return await this.stripeService.verifyPayment(session_id);
	}

	@Post('/webhook')
	async handlePaymentSucceeded(@Req() request: RawBodyRequest<Request>) {
		return await this.stripeService.handleWebhookEvent(request);
	}
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TransactionsService {
	constructor(private prisma: PrismaService, private users: UsersService, private auth: AuthService) {}

	async create(createTransactionDto: CreateTransactionDto, licenseIds: number[], templateIds: number[]) {
		// let user: User;

		// if (createTransactionDto.templates) {
		// 	user = await this.users.addTemplate(createTransactionDto.userId, createTransactionDto.templates);
		// }

		// if (createTransactionDto.licenses) {
		// 	user = await this.users.addLicense(createTransactionDto.userId, createTransactionDto.licenses);
		// }



		return await this.prisma.transactions.create({
			data: {
				...createTransactionDto,
				// transactionMetas:
				// 	create: transactionMetas?.map(meta => ({ key: meta.key, value: meta.value })),
				// },
				licenses: {
					connect: licenseIds?.map((id) => ({ id }))
				},
				templates: {
					connect: templateIds?.map((id) => ({ id }))
				}
			}
		});

		// return this.auth.login(user);
	}

	findAll() {
		return this.prisma.transactions.findMany();
	}

	findOne(id: number) {
		return this.prisma.transactions.findUnique({
			where: {
				id: id
			},
			include: {
				templates: true,
				licenses: true
			}
		});
	}

	update(id: number, updateTransactionDto: UpdateTransactionDto) {
		return this.prisma.transactions.update({
			where: {
				id: id
			},
			data: updateTransactionDto
		});
	}

	remove(id: number) {
		return this.prisma.transactions.delete({
			where: {
				id: id
			}
		});
	}
}

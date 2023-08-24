import { Injectable } from '@nestjs/common';
import { CreateTransactionMetaDto } from './dto/create-transaction-meta.dto';
import { UpdateTransactionMetaDto } from './dto/update-transaction-meta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionMetaService {
	constructor(private prisma: PrismaService) {}
	async create(createTransactionMetaDto: CreateTransactionMetaDto) {
		return await this.prisma.transactionMetas.create({
			data: createTransactionMetaDto
		});
	}

	findAll() {
		return this.prisma.transactionMetas.findMany();
	}

	findOne(id: number) {
		return this.prisma.transactionMetas.findUnique({
			where: {
				id: id
			}
		});
	}

	async findOneByKey(key: string, value: string): Promise<CreateTransactionMetaDto> {
		return this.prisma.transactionMetas.findFirst({
			where: {
				key,
				value
			}
		});
	}

	async findOneByKeyIncludeTransaction(key: string, value: string): Promise<CreateTransactionMetaDto> {
		return this.prisma.transactionMetas.findFirst({
			where: {
				key,
				value
			},
			include: {
				transactions: true
			}
		});
	}

	update(id: number, updateTransactionMetaDto: UpdateTransactionMetaDto) {
		return this.prisma.transactionMetas.update({
			where: {
				id: id
			},
			data: updateTransactionMetaDto
		});
	}

	remove(id: number) {
		return this.prisma.transactionMetas.delete({
			where: {
				id: id
			}
		});
	}
}

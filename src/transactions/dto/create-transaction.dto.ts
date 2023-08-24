import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsBoolean, IsEnum} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {PaymentGatewayProvider} from '@prisma/client'

export class CreateTransactionDto {
	@ApiProperty({ example: 1 })
	@Type(() => Number)
	@IsNumber()
	userId: number;

	@ApiProperty({ example: 'STRIPE' })
	@IsEnum(PaymentGatewayProvider)
	method:PaymentGatewayProvider

	@ApiProperty({ example: false })
	@IsBoolean()
	paidStatus: boolean;

	@ApiProperty({ example: 200 })
	@Type(() => Number)
	@IsNumber()
	amount: number;
}

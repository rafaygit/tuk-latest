import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketTypes } from '@prisma/client';
import { TicketStatuses } from '@prisma/client';
export class UpdateTicketDto extends PartialType(CreateTicketDto) {
	@ApiProperty({ example: 'Subject' })
	@IsString()
	subject: string;

	@ApiProperty({ example: 'Open' })
	@IsString()
	status: TicketStatuses;

	@ApiProperty({ example: 'Bug' })
	@IsString()
	type: TicketTypes;

	@ApiProperty({ example: 'Description' })
	@IsOptional()
	@IsString()
	description: string;
}

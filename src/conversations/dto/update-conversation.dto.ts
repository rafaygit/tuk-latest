import { PartialType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversation.dto';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateConversationDto extends PartialType(CreateConversationDto) {
	@ApiProperty({ example: 2 })
	@IsNumber()
	ticketId: number;
	@ApiProperty({ example: 2 })
	@IsNumber()
	userId: number;
	@ApiProperty({ example: 'Hellooo!!!!' })
	@IsString()
	message: string;
}

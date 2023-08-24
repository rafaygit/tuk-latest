import { Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Request } from 'express';
import { UserRoles } from '@prisma/client';

@Injectable()
export class ConversationsService {
	constructor(private prisma: PrismaService, private aws: AwsService, private tickets: TicketsService) {}

	async create(createConversationDto: CreateConversationDto, user: object) {
	

		//const ticketInfo = await this.tickets.findOne(createConversationDto.ticketId);
		return await this.prisma.conversations.create({
			data: {...createConversationDto, userId: user?.["id"] || undefined}
		});

		// if (request['user']?.role === UserRoles.USER) {
		// 	// await this.aws.sendMailToAdmin(ticketInfo.subject, createConversationDto.message);
		// } else {
		// 	// await this.aws.sendMailToClient(ticketInfo.subject, createConversationDto.message, ticketInfo.user.email);
		// }

		
	}

	findAll() {
		return this.prisma.conversations.findMany();
	}

	async findAllPaginated(skip: number, take: number) {

		  const count = await this.prisma.conversations.count()
		  const conversation = await this.prisma.conversations.findMany({
			skip: skip,
			take: take, 
		  })
		  return {conversation: conversation, count }

	}

	findOne(id: number) {
		return this.prisma.conversations.findUnique({
			where: {
				id: id
			}
		});
	}

	update(id: number, updateConversationDto: UpdateConversationDto) {
		return this.prisma.conversations.update({
			where: {
				id: id
			},
			data: updateConversationDto
		});
	}

	remove(id: number) {
		return this.prisma.conversations.delete({
			where: {
				id: id
			}
		});
	}
}

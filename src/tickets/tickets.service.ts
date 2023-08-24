import { Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
	constructor(private prisma: PrismaService, private aws: AwsService) {}

	async create(createTicketDto: CreateTicketDto, user: object) {
		const createTicket = this.prisma.tickets.create({
			data: {...createTicketDto, requesterId: user?.["id"] || undefined}
		});
		// await this.aws.sendMailToAdmin(createTicketDto.subject, createTicketDto.description);
		// console.log('Mail sent to admin');
		return createTicket;
	}

	findAll(conversations:boolean) {
		let query = {}
	
		if (conversations) {
			query["include"] = {
				conversations: true,
			}
		}
		return this.prisma.tickets.findMany(query);
	}


	findOne(id: number) {
		return this.prisma.tickets.findUnique({
			where: {
				id: id
			},
			include: {
				conversations: true,
				user: {
					select: {
						email: true
					}
				}
			}
		});
	}

	findOneWithConversation(id: number, conversations:boolean) {
			let query = {
				where: {
					id: id
				},
				
			}
		
			if (conversations) {
				query["include"] = {
				
					conversations: true,
					user: {
						select: {
							email: true
						}
					}
			
			}
		}
		return this.prisma.tickets.findUnique(query);
	}

	async findPaginated(skip: number, take: number, conversations:boolean) {
		let query = {
		  skip: skip,
		  take: take, 
		}
			if(conversations) {
				query["include"] = {
				
					conversations: true,
					user: {
						select: {
							email: true
						}
					}
			}
		}
	
		const count = await this.prisma.tickets.count()
		const tickets = await this.prisma.tickets.findMany(query)
		return {tickets: tickets, count }
	  }

	update(id: number, updateTicketDto: UpdateTicketDto) {
		return this.prisma.tickets.update({
			where: {
				id: id
			},
			data: updateTicketDto
		});
	}

	remove(id: number) {
		return this.prisma.tickets.delete({
			where: {
				id: id
			}
		});
	}
}

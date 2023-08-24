import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseBoolPipe, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Request } from 'express';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
	constructor(private readonly ticketsService: TicketsService) {}

	@ApiOperation({
		description: 'Create a ticket.'
	})
	@ApiBearerAuth()
	@Roles(UserRoles.ADMIN, UserRoles.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@Body() createTicketDto: CreateTicketDto, @Req() req: Request) {
		
		return this.ticketsService.create(createTicketDto, req?.["user"]);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Get all tickets.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	findAll(@Query('conversations', new DefaultValuePipe(false), ParseBoolPipe) conversations: boolean) {
		return this.ticketsService.findAll(conversations);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Get all tickets Paginated'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get("/skip/:skip/take/:take")
	findAllPaginated(@Param('skip') skip: number, @Param('take') take: number,@Query('conversations', new DefaultValuePipe(false), ParseBoolPipe) conversations: boolean) {
		return this.ticketsService.findPaginated(skip,take,conversations);
	}

	@ApiOperation({
		description: 'Get a ticket by its ID with conversation'
	})
	@ApiBearerAuth()
	@Roles(UserRoles.ADMIN, UserRoles.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOneWithConversation(@Param('id') id: string,@Query('conversations', new DefaultValuePipe(false), ParseBoolPipe) conversations: boolean) {
		return this.ticketsService.findOneWithConversation(+id,conversations);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Update a ticket by its ID.'
	})
	@Roles(UserRoles.ADMIN, UserRoles.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
		return this.ticketsService.update(+id, updateTicketDto);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Delete a ticket by its ID.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ticketsService.remove(+id);
	}
}

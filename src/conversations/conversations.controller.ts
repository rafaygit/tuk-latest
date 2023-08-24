import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Request } from 'express';

@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
	constructor(private readonly conversationsService: ConversationsService) {}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Create a conversation between users and tickets.'
	})
	@Roles(UserRoles.ADMIN, UserRoles.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@Body() createConversationDto: CreateConversationDto, @Req() req: Request) {
		return this.conversationsService.create(createConversationDto, req?.["user"]);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Get all conversations.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	findAll() {
		return this.conversationsService.findAll();
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Get all conversations Paginated'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get("/skip/:skip/take/:take")
	findAllPaginated(@Param('skip') skip: number, @Param('take') take: number) {
		return this.conversationsService.findAllPaginated(skip,take);
	}

	@ApiOperation({
		description: 'Get a conversation by its ID.'
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.conversationsService.findOne(+id);
	}

	@ApiOperation({
		description: 'Update a conversation by its ID.'
	})
	@Patch(':id')
	update(@Param('id') id: number, @Body() updateConversationDto: UpdateConversationDto) {
		return this.conversationsService.update(+id, updateConversationDto);
	}

	@ApiOperation({
		description: 'Delete a conversation by its ID.'
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.conversationsService.remove(+id);
	}
}

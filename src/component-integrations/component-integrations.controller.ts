import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ComponentIntegrationsService } from './component-integrations.service';
import { CreateComponentIntegrationDto } from './dto/create-component-integration.dto';
import { UpdateComponentIntegrationDto } from './dto/update-component-integration.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserRoles } from '@prisma/client';

@ApiTags('Component Integrations')
@Controller('component-integrations')
export class ComponentIntegrationsController {
	constructor(private readonly componentIntegrationsService: ComponentIntegrationsService) {}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Create a components integration.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@Body() createComponentIntegrationDto: CreateComponentIntegrationDto) {
		return this.componentIntegrationsService.create(createComponentIntegrationDto);
	}

	@ApiOperation({
		description: 'Get all components integration.'
	})
	@Get()
	findAll() {
		return this.componentIntegrationsService.findAll();
	}

	@ApiOperation({
		description: 'Get a components integration by its ID.'
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.componentIntegrationsService.findOne(+id);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Update a components integration by its ID.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateComponentIntegrationDto: UpdateComponentIntegrationDto) {
		return this.componentIntegrationsService.update(+id, updateComponentIntegrationDto);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Delete a components integration by its ID.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.componentIntegrationsService.remove(+id);
	}
}

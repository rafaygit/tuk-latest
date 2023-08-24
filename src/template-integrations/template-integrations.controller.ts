import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TemplateIntegrationsService } from './template-integrations.service';
import { CreateTemplateIntegrationDto } from './dto/create-template-integration.dto';
import { UpdateTemplateIntegrationDto } from './dto/update-template-integration.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { ComponentTags, IntegrationTypes, UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Template Integrations')
@Controller('template-integrations')
export class TemplateIntegrationsController {
	constructor(private readonly templateIntegrationService: TemplateIntegrationsService) {}

	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				templateId:{
					type:'number'
				},
				type:{
					type:'string',
					enum:[
						IntegrationTypes.REACTJS,
						IntegrationTypes.ANGULARJS,
						IntegrationTypes.VUEJS,
						IntegrationTypes.HTML
					]
				},
				zipFile: {
					type: 'string',
					format: 'binary'
				},
			}
		}
	})
	@UseInterceptors(FileInterceptor('zipFile'))
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@Body() createTemplatesIntegrationDto: CreateTemplateIntegrationDto,@UploadedFile() zipFile: Express.Multer.File) {
		return this.templateIntegrationService.create(createTemplatesIntegrationDto, zipFile);
	}

	@ApiOperation({
		description: 'Get all template integrations.'
	})
	@Get()
	findAll() {
		return this.templateIntegrationService.findAll();
	}

	@ApiOperation({
		description: 'Get a template integration by its ID.'
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.templateIntegrationService.findOne(+id);
	}
	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				templateId:{
					type:'number'
				  },
				type:{
					type:'string',
					enum:[IntegrationTypes.REACTJS,IntegrationTypes.ANGULARJS,IntegrationTypes.VUEJS,IntegrationTypes.HTML]
				},
				
				zipFile: {
					type: 'string',
					format: 'binary'
				},
			}
		}
	})
	@UseInterceptors(FileInterceptor('zipFile'))
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTemplatesIntegrationDto: UpdateTemplateIntegrationDto,@UploadedFile() image?: Express.Multer.File) {
		return this.templateIntegrationService.update(+id, updateTemplatesIntegrationDto,image);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Delete a template integration by its ID.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.templateIntegrationService.remove(+id);
	}
}

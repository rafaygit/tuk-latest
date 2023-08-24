import { Controller, Get, Post, Body, Patch, Delete, UploadedFile, UseInterceptors, UseGuards, Param, Req, Query, ParseIntPipe } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { IntegrationTypes, UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
	constructor(private templatesService: TemplatesService) {}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Create a new template.'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				name:{
					type:'string'
				  },
				description:{
					type:'string'
				},
				price:{
					type:'number'
				},
				image: {
					type: 'string',
					format: 'binary'
				},
			}
		}
	})
	@UseInterceptors(FileInterceptor('image'))
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@Body() createTemplateDto: CreateTemplateDto, @UploadedFile() image: Express.Multer.File) {
		return this.templatesService.create(createTemplateDto, image);
	}

	@ApiOperation({
		description: 'Get all templates.'
	})
	@Get()
	findAll() {
		return this.templatesService.findAll();
	}

	@ApiOperation({
		description: 'Get all templates paginated.'
	})
	@Get('skip/:skip/take/:take')
	@ApiOperation({ summary: 'Retrieve templates with pagination, search, and integration type filtering' })
    @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Number of records to skip for pagination' })
    @ApiQuery({ name: 'take', required: false, type: Number, description: 'Number of records to take for pagination' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term for template names or descriptions' })
    @ApiQuery({ name: 'integrationType', required: false, enum: IntegrationTypes, description: 'Filter by integration type' })
    @ApiResponse({ status: 200, description: 'Templates fetched successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findAllPaginated(
        @Query('skip', ParseIntPipe) skip?: number,
        @Query('take', ParseIntPipe) take?: number,
        @Query('search') search?: string,
        @Query('integrationType') integrationType?: IntegrationTypes
    ) {
        return await this.templatesService.findAllPaginated(skip, take, search, integrationType);
    }

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Get a template by its ID.'
	})
	@Roles(UserRoles.USER, UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	async findOne(@Param('id') id: number, @Req() request: Request) {
		return await this.templatesService.findOne(+id, request);
	}

	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				name:{
					type:'string'
				  },
				description:{
					type:'string'
				},
				price:{
					type:'number'
				},
				image: {
					type: 'string',
					format: 'binary'
				},
			}
		}
	})
	@UseInterceptors(FileInterceptor('image'))
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto, @UploadedFile() image?: Express.Multer.File) {
		return this.templatesService.update(+id, updateTemplateDto, image);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Delete a template by its ID.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.templatesService.remove(+id);
	}
}

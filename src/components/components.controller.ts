import { Controller, Get, Post, Body, Patch, Delete, UseInterceptors, Param, UseGuards, Req, UploadedFiles } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { ComponentAccessType, ComponentTags, UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Request } from 'express';

@ApiTags('Components')
@Controller('components')
export class ComponentsController {
	constructor(private componentsService: ComponentsService) {}
	
	@ApiBearerAuth()
	@ApiOperation({
		description: 'Create a component.'
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
				accessType: {
					type: 'string',
					enum: [ComponentAccessType.PAID, ComponentAccessType.FREE]
				},

				tag: {
					type: 'string',
					enum: [ComponentTags.NEW, ComponentTags.DEPRECIATED]
				},
				categoryId:{
					type:'number'
				},
				image: {
					type: 'string',
					format: 'binary'
				},
				imageTabletView: {
					type: 'string',
					format: 'binary',
				},
				imageMobileView: {
					type: 'string',
					format: 'binary',
				},
			}
		}
	})
	@UseInterceptors(FileFieldsInterceptor([
		{ name: 'image', maxCount: 1 },
		{ name: 'imageTabletView', maxCount: 1 },
		{ name: 'imageMobileView', maxCount: 1 },
	]))
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@UploadedFiles() files: { image?: Express.Multer.File, imageTabletView?: Express.Multer.File, imageMobileView?: Express.Multer.File }, @Body() createComponentDto: CreateComponentDto) {
		return this.componentsService.create(createComponentDto, files);
	}

	@ApiProperty({
		description: 'Get all components.'
	})
	@Get()
	findAll() {
		return this.componentsService.findAll();
	}

	@ApiOperation({
		description: 'Get all Components paginated'
	})
	@Get("/skip/:skip/take/:take")
	findPaginated(@Param('skip') skip: number, @Param('take') take: number){
		 return this.componentsService.findPaginated(skip,take);
	}
	
	@ApiBearerAuth()
	@ApiOperation({
		description: 'Get a component by its ID.'
	})
	@Roles(UserRoles.USER, UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: string, @Req() request: Request) {
		return this.componentsService.findOne(+id, request);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Update a component by its ID.'
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
				accessType: {
					type: 'string',
					enum: [ComponentAccessType.PAID, ComponentAccessType.FREE]
				},
				tag: {
					type: 'string',
					enum: [ComponentTags.NEW, ComponentTags.DEPRECIATED]
				},
				categoryId:{
					type:'number'
				},
				image: {
					type: 'string',
					format: 'binary'
				},
				imageTabletView: {
					type: 'string',
					format: 'binary',
				},
				imageMobileView: {
					type: 'string',
					format: 'binary',
				},
			}
		}
	})
	@UseInterceptors(FileFieldsInterceptor([
		{ name: 'image', maxCount: 1 },
		{ name: 'imageTabletView', maxCount: 1 },
		{ name: 'imageMobileView', maxCount: 1 },
	]))
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	update(@UploadedFiles() files: { image?: Express.Multer.File, imageTabletView?: Express.Multer.File, imageMobileView?: Express.Multer.File }, @Param('id') id: string, @Body() updateComponentDto: UpdateComponentDto) {
		return this.componentsService.update(+id, updateComponentDto, files);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Delete a component by its ID.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.componentsService.remove(+id);
	}
}

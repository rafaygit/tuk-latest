import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Query, DefaultValuePipe, ParseBoolPipe} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
	constructor(private categoriesService: CategoriesService) {}
	
	@ApiBearerAuth()
	@ApiOperation({
		description: 'Create a Category.'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
		  type: 'object',
		  properties: {
			name: { type: 'string' },
			uiKitId: {
				type: 'integer',
			},
			image: {
			  type: 'string',
			  format: 'binary',
			},
		  },
		},
	})
	@ApiResponse({ status: 201, description: 'Category successfully created.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	@UseInterceptors(FileInterceptor('image'))
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	async create(@UploadedFile() image: Express.Multer.File, @Body() createCategoryDto: CreateCategoryDto) {
		return this.categoriesService.create(createCategoryDto, image);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create a subcategory' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
		  type: 'object',
		  properties: {
			name: { type: 'string' },
			description: { type: 'string' },
			parentId: {
				type: 'integer',
			},
			image: {
				type: 'string',
				format: 'binary',
			},
		  },
		},
	})
	@ApiResponse({ status: 201, description: 'Subcategory successfully created.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	@UseInterceptors(FileInterceptor('image'))
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('subcategories')
	addSubCategory(@UploadedFile() image: Express.Multer.File, @Body() createSubCategoryDto: CreateSubCategoryDto): Promise<CreateSubCategoryDto> {
		return this.categoriesService.addSubCategory(createSubCategoryDto, image);
	}
	
	@ApiOperation({
		description: 'Get all Categories'
	})
	@Get()
	findAll(
		@Query('components', new DefaultValuePipe(false), ParseBoolPipe) components: boolean,
		@Query('integrations', new DefaultValuePipe(false), ParseBoolPipe) integrations: boolean, 
	): Promise<Category[]> {
		return this.categoriesService.findAll(components, integrations);
	}
		
	@ApiOperation({
		description: 'Get all Categories paginated'
	})
	@Get("/skip/:skip/take/:take")
	findPaginated(
		@Query('components', new DefaultValuePipe(false), ParseBoolPipe) components: boolean,
		@Query('integrations', new DefaultValuePipe(false), ParseBoolPipe) integrations: boolean, 
		@Param('skip') skip: number, @Param('take') take: number
	) {
		return this.categoriesService.findPaginated(skip, take, components, integrations);
	}

	@ApiOperation({
		description: 'Get all Sub-Categories Paginated'
	})
	@Get('subCategories/skip/:skip/take/:take')
	findAllSubcategoriesPaginated(
		@Query('components', new DefaultValuePipe(false), ParseBoolPipe) components: boolean, 
		@Query('integrations', new DefaultValuePipe(false), ParseBoolPipe) integrations: boolean, 
		@Param('skip') skip: number, @Param('take') take: number
	) {
		return this.categoriesService.findAllSubcategoriesPaginated(skip, take, components, integrations);
	}

	@ApiOperation({
		description: 'Get all Sub-Categories'
	})
	@Get('subCategories')
	findAllSubcategories(
		@Query('components', new DefaultValuePipe(false), ParseBoolPipe) components: boolean, 
		@Query('integrations', new DefaultValuePipe(false), ParseBoolPipe) integrations: boolean, 
	) {
		return this.categoriesService.findAllSubcategories(components, integrations);
	}

	@ApiOperation({
		description: 'Get Category by Id'
	})
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Category> {
		return this.categoriesService.findOne(+id);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Update a Category.'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
		  type: 'object',
		  properties: {
			name: { type: 'string', nullable: true },
			uiKitId: { type: 'integer', nullable: true },
			description: { type: 'string' },
			parentId: {
				type: 'integer',
				nullable: true
			},
			image: {
			  type: 'string',
			  format: 'binary',
			  nullable: true
			},
		  },
		},
	  })
	@UseInterceptors(FileInterceptor('image'))
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	update(@UploadedFile() image: Express.Multer.File, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<UpdateCategoryDto> {
		return this.categoriesService.update(+id, updateCategoryDto, image);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Delete a Category.'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string): Promise<Category> {
		return this.categoriesService.remove(+id);
	}
}

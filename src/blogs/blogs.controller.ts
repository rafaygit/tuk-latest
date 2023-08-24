import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Roles } from 'src/auth/guard/roles.decorator';
import { BlogTypes, UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
	constructor(private readonly blogsService: BlogsService) {}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Create a new Blog'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				title: {
					type: 'string'
				},
				subTitle: {
					type: 'string'
				},
				type: {
					type: 'string',
					enum: [BlogTypes.OTHERS]
				},
				content: {
					type: 'number'
				},
				image: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(FileInterceptor('image'))
	@Post()
	create(@UploadedFile() image: Express.Multer.File, @Body() createBlogDto: CreateBlogDto, @Req() request: Request) {
		return this.blogsService.create(createBlogDto, image, request);
	}

	@ApiOperation({
		description: 'Get all Blogs'
	})
	@Get()
	findAll() {
		return this.blogsService.findAll();
	}

	@ApiOperation({
		description: 'Get all Blogs Paginated'
	})
	@Get("/skip/:skip/take/:take")
	findAllPaginated(@Param('skip') skip: number, @Param('take') take: number) {
		return this.blogsService.findAllPaginated(skip,take);
	}

	@ApiOperation({
		description: 'Get blog by Id'
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.blogsService.findOne(+id);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Update blog by Id'
	})

	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				title: {
					type: 'string'
				},
				subTitle: {
					type: 'string'
				},
				type: {
					type: 'string',
					enum: [BlogTypes.OTHERS]
				},
				content: {
					type: 'number'
				},
				image: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(FileInterceptor('image'))
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @UploadedFile() image: Express.Multer.File, @Req() request: Request) {
		return this.blogsService.update(+id, updateBlogDto, image, request);
	}

	@ApiBearerAuth()
	@ApiOperation({
		description: 'Delete blog by Id'
	})
	@Roles(UserRoles.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.blogsService.remove(+id);
	}
}

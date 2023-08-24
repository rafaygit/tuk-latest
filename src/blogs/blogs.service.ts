import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsService } from 'src/aws/aws.service';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BlogsService {
	constructor(private prisma: PrismaService, private awsService: AwsService, private usersService: UsersService) {}

	async create(createBlogDto: CreateBlogDto, image: Express.Multer.File, request: Request) {
		const slug: string = this.createSlug(createBlogDto.title);
		const uploadedFile = await this.awsService.uploadFile(image);
		const user = await this.usersService.findByEmail(request['user'].email);
		let authorName = user?.lastName ? `${user.firstName} ${user.lastName}` : `${user.firstName}`;

		return this.prisma.blogs.create({
			data: { ...createBlogDto, image: uploadedFile?.Location, slug: slug, author: authorName }
		});
	}

	createSlug(title: string): string {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	findAll() {
		return this.prisma.blogs.findMany();
	}

	async findAllPaginated(skip:number,take:number) {
		let count = await this.prisma.blogs.count()
		const blogs = await this.prisma.blogs.findMany({
			skip: skip,
      		take: take,
		});
		return {blogs, count}
	}

	findOne(id: number) {
		return this.prisma.blogs.findUnique({
			where: {
				id: id
			}
		});
	}

	async update(id: number, updateBlogDto: UpdateBlogDto, image: Express.Multer.File, request: Request) {
		const slug: string = this.createSlug(updateBlogDto.title);
		const uploadedFile = await this.awsService.uploadFile(image);
		const user = await this.usersService.findByEmail(request['user'].email);
		let authorName = user?.lastName ? `${user.firstName} ${user.lastName}` : `${user.firstName}`;
		return this.prisma.blogs.update({
			where: {
				id: id
			},
			data: { ...updateBlogDto, image: uploadedFile?.Location, slug: slug, author: authorName }
		});
	}

	remove(id: number) {
		return this.prisma.blogs.delete({
			where: {
				id: id
			}
		});
	}
}

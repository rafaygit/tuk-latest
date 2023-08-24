import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { AwsService } from 'src/aws/aws.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { IntegrationTypes, Prisma } from '@prisma/client';

@Injectable()
export class TemplatesService {
	constructor(private prisma: PrismaService, private awsService: AwsService) {}

	async create(createTemplateDto: CreateTemplateDto, image: Express.Multer.File) {
		const uploadedFile = await this.awsService.uploadFile(image);
		return this.prisma.templates.create({
			data: {...createTemplateDto, image: uploadedFile?.Location}
		});
	}

	async sumPriceByTemplatesIds(temlatesIds: number[]) {
		return this.prisma.templates.aggregate({
			where: {
			  id: {
				in: [...temlatesIds],
			  },
			},
			_sum: {
			  price: true,
			},
		})
	}

	async findAllPaginated(skip: number, take: number, search?: string, integrationType?: IntegrationTypes) {
		let count = await this.prisma.templates.count()
		const where: Prisma.templatesWhereInput = {};  // Initialize filtering conditions
	
		// Adding search functionality based on name and description
		if (search) {
			where.OR = [
				{
					name: {
						contains: search,
						mode: 'insensitive'  // case-insensitive search
					}
				},
				{
					description: {
						contains: search,
						mode: 'insensitive'  // case-insensitive search
					}
				}
			];
		}
	
		// Adding filtration for IntegrationTypes
		if (integrationType) {
			where.integrations = {
				some: {
					type: integrationType
				}
			};
		}
	
		let templates = await this.prisma.templates.findMany({
			skip: skip,
			take: take,
			where: where,
			include: {
				integrations: true
			}
		});

		return {templates, count}
	}
	
	async findAll() {
		return this.prisma.templates.findMany();
	}

	async findOne(id: number, request: Request) {
		let userData = request['user'];
		let hasTemplate = userData?.templates.length;
		try {
			if (hasTemplate > 0) {
				const userTemplateIds = userData.templates.map((template) => template.id);

				return await this.prisma.templates.findFirstOrThrow({
					where: {
						id: id,
						users: {
							some: { id: { in: userTemplateIds } }
						}
					},
					include: {
						integrations: true
					}
				});
			} else {
				return await this.prisma.templates.findUniqueOrThrow({
					where: {
						id: id
					}
				});
			}
		} catch (err) {
			throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
		}
	}

	async findOneFromDb(id: number) {
		return this.prisma.templates.findUnique({
			where: {
				id: id
			}
		});
	}

	async findManyBySelection(templateIds: number[], selections: string[]) {
		let query = {}

		if (templateIds.length) {
			query["where"] = {
				id: {
					in: templateIds
				}
			}
		}
		
		if (selections.length) {
			query["select"] = {};
			selections.map(selection => {
				query["select"][selection] = true;
			});
		}

		return this.prisma.templates.findMany(query)
	}

	async update(id: number, updateTemplateDto: UpdateTemplateDto, image?: Express.Multer.File) {
		let uploadedFile = undefined
		if (image) {
			uploadedFile = await this.awsService.uploadFile(image);
		}

		return this.prisma.templates.update({
			where: {
				id: id
			},
			data: {...updateTemplateDto, image: uploadedFile?.Location || undefined}
		});
	}

	async remove(id: number) {
		return this.prisma.templates.delete({
			where: {
				id: id
			}
		});
	}
}

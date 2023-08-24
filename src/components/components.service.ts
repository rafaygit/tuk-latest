import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { ComponentAccessType } from '@prisma/client';
import { UtilsService } from 'src/utils/utils.service';
import { ComponentMetasService } from 'src/component-metas/component-metas.service';

@Injectable()
export class ComponentsService {
	constructor(private prisma: PrismaService, private componentMetasService: ComponentMetasService, private utilsService: UtilsService) {}

	async create(createComponentDto: CreateComponentDto, files: { image?: Express.Multer.File, imageTabletView?: Express.Multer.File, imageMobileView?: Express.Multer.File }) {
		// TODO: For some reason the below attributes are coming in as part of the DTO.
		delete createComponentDto?.["imageTabletView"]
		delete createComponentDto?.["imageMobileView"]

		const images = await this.utilsService.uploadImages(files);
		const component = await this.prisma.components.create({
			data: {...createComponentDto, image: images?.["image"]}
		});
		
		const attributesToSaveAsMetas = ["imageTabletView", "imageMobileView"];
		for (const key of attributesToSaveAsMetas) {
			if (images[key]) {
				await this.componentMetasService.create({key: key, value: images[key], componentId: component.id})
			}
		}
		
		return component;
	}

	async findAll() {
		return await this.prisma.components.findMany({
			include:{
				componentMetas:true
			}
		});
	}

	async findPaginated(skip: number, take: number) {
		const count = await this.prisma.components.count()
		let components = await this.prisma.components.findMany({
		  skip: skip,
		  take: take,
		})

		return {components:components, count}
	}

	async findOne(id: number, request: Request) {
		const component = await this.prisma.components.findUniqueOrThrow({where:{"id":id}, include: {integrations: true}})
		if (component.accessType === ComponentAccessType.FREE) {
			return component;
		} else {
			let user = request['user'];
			if (user && user?.licenses.length > 0) {
				const userLicenseIds = user.licenses.map((license) => license.id);
				return this.prisma.components.findFirstOrThrow({
					where: {
						id: id,
						category: {
							uiKits: {
								licenses: {
									some: { id: { in: userLicenseIds } }
								}
							}
						}
					},
					include: {
						integrations: true
					}
				});
			}
			throw new HttpException('Please purchase license to continue!', HttpStatus.FORBIDDEN);
		}
	}

	async update(id: number, updateComponentDto: UpdateComponentDto, files) {
		// TODO: For some reason the below attributes are coming in as part of the DTO.
		delete updateComponentDto?.["imageTabletView"]
		delete updateComponentDto?.["imageMobileView"]

		console.log(updateComponentDto)
		let images;
		if (files && Object.entries(files).length) {
			images = await this.utilsService.uploadImages(files);
		}
		const component = await this.prisma.components.update({
			where: { id },
			data: {
				categoryId:  updateComponentDto.categoryId || undefined, 
				image: images?.["image"] || undefined,
				description:updateComponentDto.description || undefined,
				accessType:updateComponentDto.accessType || undefined,
				tag: updateComponentDto.tag||undefined
			}
		});

		if (images && Object.entries(images).length) {
			const attributesToSaveAsMetas = ["imageTabletView", "imageMobileView"];
			for (const key of attributesToSaveAsMetas) {
				if (images[key]) {
					let componentMeta = await this.componentMetasService.findByComponentId(component.id, key)
					if (componentMeta) {
						await this.componentMetasService.update(
							componentMeta.id,
							{value: images[key], componentId: component.id}
							)
						} else {
						await this.componentMetasService.create({key: key, value: images[key], componentId: component.id})
					}
				}
			}
		}
		
		return component;
	}

	remove(id: number) {
		return this.prisma.components.delete({
			where: {
				id: id
			}
		});
	}
}

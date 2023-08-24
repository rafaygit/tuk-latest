import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from './entities/category.entity';
import { AwsService } from 'src/aws/aws.service';
import { ComponentAccessType } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService, private awsService: AwsService) {}

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File): Promise<CreateCategoryDto> {
    const uploadedFile = await this.awsService.uploadFile(image);
    return this.prisma.categories.create({
      data: {...createCategoryDto, image: uploadedFile?.Location},
    });
  }
  
  async addSubCategory(createSubCategoryDto: CreateSubCategoryDto, image: Express.Multer.File): Promise<CreateSubCategoryDto> {
    const category = await this.prisma.categories.findUnique({ where: { id: createSubCategoryDto.parentId } });
    if (!category) {
      throw new NotFoundException('Category not found!');
    }
    const uploadedFile = await this.awsService.uploadFile(image);
    return this.prisma.categories.create({
      data: {...createSubCategoryDto, uiKitId: category.uiKitId, image: uploadedFile?.Location}
    });
  }

  
  async findAll(components:boolean, integrations: boolean): Promise<Category[]> {
    let query = {
      where: {
        parentId: null,
      },
      include: {
        subCategories: true,
      }
    }

    if (components) {
      query["include"]["components"] = {
        include: {
          integrations: true
        }
      }

      if (integrations) {
        query["include"]["components"]["include"]["integrations"] = {
          where: {
            components: {
              accessType: ComponentAccessType.FREE
            }
          }
        }
      }
    }

    return this.prisma.categories.findMany(query);   
  }

  async findAllSubcategoriesPaginated(skip: number, take: number, components: boolean, integrations: boolean) {
    const count = await this.prisma.categories.count({  where: {
      parentId: {
        not: null
      }
    }})

    let query = {
      where: {
        parentId: {
          not: null
        }
      },
      skip: skip,
      take: take,
    }

    if (components) {
      query["include"] = {}
      query["include"]["components"] = {
        include: {
          integrations: true
        }
      }

      if (integrations) {
        query["include"]["components"]["include"]["integrations"] = {
          where: {
            components: {
              accessType: ComponentAccessType.FREE
            }
          }
        }
      }
    }
    const categories = await this.prisma.categories.findMany(query);
    return {subCategories: categories, count }

  }

  findAllSubcategories(components: boolean, integrations: boolean): Promise<Category[]> {
    let query = {
      where: {
        parentId: {
          not: null
        }
      }
    }

    if (components) {
      query["include"] = {}
      query["include"]["components"] = {
        include: {
          integrations: true
        }
      }

      if (integrations) {
        query["include"]["components"]["include"]["integrations"] = {
          where: {
            components: {
              accessType: ComponentAccessType.FREE
            }
          }
        }
      }
    }

    return this.prisma.categories.findMany(query);   
  }


  async findPaginated(skip: number, take: number, components:boolean, integrations: boolean) {
    let query = {
      where: {
        parentId: null,
      },
      skip: skip,
      take: take,
      include: {
        subCategories: true,
      }
    }

    if (components) {
      query["include"]["components"] = {
        include: {
          integrations: true
        }
      }

      if (integrations) {
        query["include"]["components"]["include"]["integrations"] = {
          where: {
            components: {
              accessType: ComponentAccessType.FREE
            }
          }
        }
      }
    }

    const count = await this.prisma.categories.count({  where: { parentId: null}})
    const categories = await this.prisma.categories.findMany(query)
    return {categories: categories, count }
  }

  async findOne(id: number): Promise<Category> {
    return this.prisma.categories.findUniqueOrThrow({
      where: { 
        id 
      },
      include: {
        components:
        {
          include:
          {
            componentMetas: true,
          } 
        }
      }
    });
  }
  
  async update(id: number, updateCategoryDto: UpdateCategoryDto, image: Express.Multer.File): Promise<UpdateCategoryDto> {
    let uploadedFile;
    if (image) {
      uploadedFile = await this.awsService.uploadFile(image);
    }
    return this.prisma.categories.update({ 
      where: { id }, 
      data: {
        name: updateCategoryDto.name || undefined, 
        uiKitId: updateCategoryDto.uiKitId || undefined, 
        parentId: updateCategoryDto.parentId || undefined, 
        description:updateCategoryDto.description ||undefined,
        image: uploadedFile?.Location || undefined
      } 
    });
  }

  async remove(id: number): Promise<Category> {
    return this.prisma.categories.delete({ where: { id } });
  }
}
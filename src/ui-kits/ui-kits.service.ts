import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUiKitDto } from './dto/create-ui-kit.dto';
import { UpdateUiKitDto } from './dto/update-ui-kit.dto';
import {CreateSubuiKitDto} from './dto/create-subuikit.dto'

@Injectable()
export class UiKitsService {
  constructor(private prisma: PrismaService) {}

  async create(createUiKitDto: CreateUiKitDto) {
    return this.prisma.uiKits.create({
      data: createUiKitDto
    });
  }

  async addSubUiKit(createSubuiKitDto: CreateSubuiKitDto) {
    const uiKit = await this.prisma.uiKits.findUnique({ where: { id: createSubuiKitDto.parentId } });
    
    if (!uiKit) {
      throw new NotFoundException('SubUiKit not found!');
    }

    return this.prisma.uiKits.create({
      data: createSubuiKitDto
    });
  }

  async findAll(content: boolean) {
    if (content) {
      return this.prisma.uiKits.findMany({
        where: {
          parentId: null,
        },
        include: {
          subUiKits: {
            include: {
              categories: {
                where: {
                  parentId: null
                },
                include: {
                  subCategories:{
                    select: {
                      id: true,
                      name: true,
                      _count: {
                        select: {
                          components: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
      });
    }

    return this.prisma.uiKits.findMany({
      where: {
        parentId: null
      }
    })
  }

  async findPaginated(skip: number, take: number) {
    const count = await this.prisma.uiKits.count({
      where: {
        parentId: null,
      }
    })
    let uiKits = await this.prisma.uiKits.findMany({
      where: {
        parentId: null,
      },
      skip: skip,
      take: take,
      include:{
        subUiKits:true 
      }
    })
    return {uiKits: uiKits, count}
  }

  async findAllSubKitsPaginated(skip: number, take: number) {
    const count = await this.prisma.uiKits.count({ where: {
      parentId: {
        not: null
      }
    }})
    let uiKits = await this.prisma.uiKits.findMany({
      where: {
        parentId: {
          not: null
        }
      },
      skip: skip,
      take: take,
    });
    
    return {uiKits: uiKits, count}

  }

  async findAllSubUikits() {
    return this.prisma.uiKits.findMany({
      where: {
        parentId: {
          not: null
        }
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.uiKits.findMany({
      where: {
        id: id,
      },
      include: {
        categories: true,
      },
    });
  }

  async update(id: number, updateUiKitDto: UpdateUiKitDto) {
    return this.prisma.uiKits.update({
      where: {
        id: id,
      },
      data: updateUiKitDto,
    });
  }

  async remove(id: number) {
    return this.prisma.uiKits.delete({
      where: {
        id: id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateComponentMetaDto } from './dto/create-component-meta.dto';
import { UpdateComponentMetaDto } from './dto/update-component-meta.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ComponentMetasService {
  constructor(private prisma: PrismaService) {}
  async create(createComponentMetaDto: CreateComponentMetaDto) {
    return await this.prisma.componentMetas.create({
      data:createComponentMetaDto
    })
  }

  findAll() {
    return this.prisma.componentMetas.findMany()
  }

  findOne(id: number) {
    return this.prisma.componentMetas.findUnique({
      where:{
        id:id
      }
    })
  }

  async findByComponentId(componentId: number, key?: string) {
    return this.prisma.componentMetas.findFirst({
      where: {
        componentId,
        key: key || undefined
      }
    })
  }

  async update(id: number, updateComponentMetaDto: UpdateComponentMetaDto) {
    return this.prisma.componentMetas.update({
      data: updateComponentMetaDto,
      where: {
        id: id
      }
    })
  }

  remove(id: number) {
    return this.prisma.componentMetas.delete({
      where:{
        id:id
      }
    })
  }
}

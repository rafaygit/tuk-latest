import { Injectable } from '@nestjs/common';
import { CreateUserMetaDto } from './dto/create-user-meta.dto';
import { UpdateUserMetaDto } from './dto/update-user-meta.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserMetasService {

  constructor(private prisma: PrismaService) {}

  async create(createUserMetaDto: CreateUserMetaDto) {
    return await this.prisma.userMetas.create({
      data:createUserMetaDto
    })
  }

  findAll() {
    return this.prisma.userMetas.findMany()
  }

  findOne(id: number) {
    return this.prisma.userMetas.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: number, updateUserMetaDto: UpdateUserMetaDto) {
    return await this.prisma.userMetas.update({
      where:{
        id:id
      },
      data:updateUserMetaDto
    })
  }

  async remove(id: number) {
    return await this.prisma.userMetas.delete({
      where:{
        id:id
      }
    })
  }
}

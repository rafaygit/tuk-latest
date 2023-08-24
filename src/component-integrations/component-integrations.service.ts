import { Injectable } from '@nestjs/common';
import { CreateComponentIntegrationDto } from './dto/create-component-integration.dto';
import { UpdateComponentIntegrationDto } from './dto/update-component-integration.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComponentIntegrationsService {
  constructor(private prisma: PrismaService) {}
  
  create(createComponentIntegrationDto: CreateComponentIntegrationDto) {
    return this.prisma.componentIntegrations.create({
      data: createComponentIntegrationDto,
    });
  }

  findAll() {
    return this.prisma.componentIntegrations.findMany();
  }

  findOne(id: number) {
    return this.prisma.componentIntegrations.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(
    id: number,
    updateComponentIntegrationDto: UpdateComponentIntegrationDto,
  ) {
    return this.prisma.componentIntegrations.update({
      where: {
        id: id,
      },
      data: updateComponentIntegrationDto
    });
  }

  remove(id: number) {
    return this.prisma.componentIntegrations.delete({
      where: {
        id: id,
      },
    });
  }
}

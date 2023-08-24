import { Injectable } from '@nestjs/common';
import { CreateTemplateIntegrationDto } from './dto/create-template-integration.dto';
import { UpdateTemplateIntegrationDto } from './dto/update-template-integration.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsService } from 'src/aws/aws.service';
@Injectable()
export class TemplateIntegrationsService {
  
  constructor(private prisma: PrismaService, private awsService: AwsService) {}
  async create(createTemplateIntegrationDto: CreateTemplateIntegrationDto, zipFile: Express.Multer.File) {
    let uploadedFile;
    if (zipFile) {
      uploadedFile = await this.awsService.uploadFile(zipFile);
    }

    // Extracting the templateId for clarity and to avoid passing it directly in the data object
    const { templateId, ...restDto } = createTemplateIntegrationDto;

    return this.prisma.templateIntegrations.create({
      data: {
        ...restDto, 
        zipFile: uploadedFile?.Location || undefined,
        templates: {
            connect: {
                id: templateId
            }
        }
      }
    });
  }

  findAll() {
    return this.prisma.templateIntegrations.findMany();
  }

  findOne(id: number) {
    return this.prisma.templateIntegrations.findMany({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateTemplateIntegrationDto: UpdateTemplateIntegrationDto,
    image?: Express.Multer.File
  ) {

    let uploadedFile = undefined
		if (image) {
			uploadedFile = await this.awsService.uploadFile(image);
		}

		return this.prisma.templateIntegrations.update({
			where: {
				id: id
			},
			data: {
        templateId:updateTemplateIntegrationDto.templateId ||undefined,
        type:updateTemplateIntegrationDto.type||undefined,
        zipFile:uploadedFile?.Location
      }
		});

    
  }

  remove(id: number) {
    return this.prisma.templateIntegrations.delete({
      where: {
        id: id,
      },
    });
  }
}

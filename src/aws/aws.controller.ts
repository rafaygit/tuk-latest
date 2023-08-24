import {
  Body,
  Get,
  Post,
  Controller,
  Request,
  UseGuards,
  Req,
  UseInterceptors,
  Header,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AwsService } from './aws.service';
@ApiTags('AWS')
@Controller('aws')
@UseInterceptors(FileInterceptor('file'))
export class AwsController {
  constructor(private awsService: AwsService) {}

  @ApiOperation({
    description: 'Upload an image.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('upload')
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.awsService.uploadFile(file);
  }
}

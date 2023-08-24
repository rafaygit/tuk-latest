import { Module } from '@nestjs/common';
import { TemplateIntegrationsService } from './template-integrations.service';
import { TemplateIntegrationsController } from './template-integrations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  controllers: [TemplateIntegrationsController],
  providers: [TemplateIntegrationsService],
  imports: [PrismaModule,AwsModule],
  exports:[TemplateIntegrationsService]
})
export class TemplateIntegrationsModule {}

import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [PrismaModule, AwsModule],
  controllers: [TemplatesController],
  providers: [TemplatesService, JwtStrategy],
  exports: [TemplatesService]
})
export class TemplatesModule {}

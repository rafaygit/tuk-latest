import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';

@Module({
  controllers: [AwsController],
  providers: [AwsService],
  imports: [ConfigModule],
  exports: [AwsService],
})
export class AwsModule {}

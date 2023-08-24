import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [UtilsController],
  providers: [UtilsService],
  exports: [UtilsService]
})
export class UtilsModule {}

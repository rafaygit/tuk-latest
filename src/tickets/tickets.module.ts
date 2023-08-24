import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { AwsModule } from 'src/aws/aws.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [AwsModule, PrismaModule],
  exports: [TicketsService],
})
export class TicketsModule {}

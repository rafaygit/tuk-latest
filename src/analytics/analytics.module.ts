import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [PrismaModule],
})
export class AnalyticsModule {}

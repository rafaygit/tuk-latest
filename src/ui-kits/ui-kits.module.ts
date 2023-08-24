import { Module } from '@nestjs/common';
import { UiKitsService } from './ui-kits.service';
import { UiKitsController } from './ui-kits.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UiKitsController],
  providers: [UiKitsService],
  imports: [PrismaModule],
})
export class UiKitsModule {}

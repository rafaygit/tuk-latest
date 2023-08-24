import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesController } from './licenses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[PrismaModule,UsersModule],
  controllers: [LicensesController],
  providers: [LicensesService],
  exports:[LicensesService]
})
export class LicensesModule {}

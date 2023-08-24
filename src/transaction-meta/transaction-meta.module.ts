import { Module } from '@nestjs/common';
import { TransactionMetaService } from './transaction-meta.service';
import { TransactionMetaController } from './transaction-meta.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [TransactionMetaController],
  providers: [TransactionMetaService],
  exports: [TransactionMetaService]
})
export class TransactionMetaModule {}

import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { TransactionMetaModule } from 'src/transaction-meta/transaction-meta.module';
import { LicensesModule } from 'src/licenses/licenses.module';
import { TemplatesModule } from 'src/templates/templates.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [TransactionsModule, TransactionMetaModule, TemplatesModule, LicensesModule,UsersModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}

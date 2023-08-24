import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserMetasModule } from './user-metas/user-metas.module';
import { UiKitsModule } from './ui-kits/ui-kits.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TemplatesModule } from './templates/templates.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LicensesModule } from './licenses/licenses.module';
import { ComponentsModule } from './components/components.module';
import { StripeModule } from './stripe/stripe.module';
import { AwsModule } from './aws/aws.module';
import { TicketsModule } from './tickets/tickets.module';
import { ConversationsModule } from './conversations/conversations.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CategoriesModule } from './categories/categories.module';
import { ComponentIntegrationsModule } from './component-integrations/component-integrations.module';
import { ComponentMetasModule } from './component-metas/component-metas.module';
import { TemplateIntegrationsModule } from './template-integrations/template-integrations.module';
import { TransactionMetaModule } from './transaction-meta/transaction-meta.module';
import { BlogsModule } from './blogs/blogs.module';
import { UtilsModule } from './utils/utils.module';

@Module({
	imports: [
		UsersModule,
		UserMetasModule,
		UiKitsModule,
		CategoriesModule,
		TransactionsModule,
		TemplateIntegrationsModule,
		TemplatesModule,
		PrismaModule,
		AuthModule,
		LicensesModule,
		ComponentsModule,
		StripeModule,
		AwsModule,
		TicketsModule,
		ConversationsModule,
		AnalyticsModule,
		CategoriesModule,
		ComponentIntegrationsModule,
		ComponentMetasModule,
		TemplateIntegrationsModule,
		TransactionMetaModule,
		BlogsModule,
		UtilsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}

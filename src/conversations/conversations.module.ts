import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';
import { TicketsModule } from 'src/tickets/tickets.module';

@Module({
	controllers: [ConversationsController],
	providers: [ConversationsService],
	imports: [PrismaModule, AwsModule, TicketsModule]
})
export class ConversationsModule {}

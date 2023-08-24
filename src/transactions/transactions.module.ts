import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, UsersModule, AuthModule],
	controllers: [TransactionsController],
	providers: [TransactionsService],
	exports: [TransactionsService]
})
export class TransactionsModule {}

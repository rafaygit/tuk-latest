import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';
import { UsersModule } from 'src/users/users.module';

@Module({
	controllers: [BlogsController],
	providers: [BlogsService],
	imports: [PrismaModule, AwsModule, UsersModule]
})
export class BlogsModule {}

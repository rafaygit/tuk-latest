import { Module } from '@nestjs/common';
import { UserMetasService } from './user-metas.service';
import { UserMetasController } from './user-metas.controller';

@Module({
  controllers: [UserMetasController],
  providers: [UserMetasService]
})
export class UserMetasModule {}

import { Module } from '@nestjs/common';
import { ComponentMetasService } from './component-metas.service';
import { ComponentMetasController } from './component-metas.controller';

@Module({
  controllers: [ComponentMetasController],
  providers: [ComponentMetasService],
  exports: [ComponentMetasService]
})
export class ComponentMetasModule {}

import { Module } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { ComponentsController } from './components.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ComponentMetasModule } from 'src/component-metas/component-metas.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
	imports: [PrismaModule, UtilsModule, ComponentMetasModule],
	controllers: [ComponentsController],
	providers: [ComponentsService]
})
export class ComponentsModule {}

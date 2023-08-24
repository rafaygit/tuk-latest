import { Module } from '@nestjs/common';
import { ComponentIntegrationsService } from './component-integrations.service';
import { ComponentIntegrationsController } from './component-integrations.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [UsersModule],
	controllers: [ComponentIntegrationsController],
	providers: [ComponentIntegrationsService]
})
export class ComponentIntegrationsModule {}

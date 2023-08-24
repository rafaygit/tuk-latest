import { Test, TestingModule } from '@nestjs/testing';
import { ComponentIntegrationsController } from './component-integrations.controller';
import { ComponentIntegrationsService } from './component-integrations.service';

describe('ComponentIntegrationsController', () => {
  let controller: ComponentIntegrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentIntegrationsController],
      providers: [ComponentIntegrationsService],
    }).compile();

    controller = module.get<ComponentIntegrationsController>(ComponentIntegrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

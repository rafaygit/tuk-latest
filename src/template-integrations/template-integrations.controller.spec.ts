import { Test, TestingModule } from '@nestjs/testing';
import { TemplateIntegrationsController } from './template-integrations.controller';
import { TemplateIntegrationsService } from './template-integrations.service';

describe('TemplateIntegrationsController', () => {
  let controller: TemplateIntegrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateIntegrationsController],
      providers: [TemplateIntegrationsService],
    }).compile();

    controller = module.get<TemplateIntegrationsController>(TemplateIntegrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

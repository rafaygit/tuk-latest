import { Test, TestingModule } from '@nestjs/testing';
import { TemplateIntegrationsService } from './template-integrations.service';

describe('TemplateIntegrationsService', () => {
  let service: TemplateIntegrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateIntegrationsService],
    }).compile();

    service = module.get<TemplateIntegrationsService>(TemplateIntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

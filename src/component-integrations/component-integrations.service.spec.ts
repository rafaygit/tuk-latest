import { Test, TestingModule } from '@nestjs/testing';
import { ComponentIntegrationsService } from './component-integrations.service';

describe('ComponentIntegrationsService', () => {
  let service: ComponentIntegrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentIntegrationsService],
    }).compile();

    service = module.get<ComponentIntegrationsService>(ComponentIntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

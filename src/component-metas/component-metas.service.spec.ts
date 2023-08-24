import { Test, TestingModule } from '@nestjs/testing';
import { ComponentMetasService } from './component-metas.service';

describe('ComponentMetasService', () => {
  let service: ComponentMetasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentMetasService],
    }).compile();

    service = module.get<ComponentMetasService>(ComponentMetasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

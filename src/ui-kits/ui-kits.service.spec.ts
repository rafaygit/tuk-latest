import { Test, TestingModule } from '@nestjs/testing';
import { UiKitsService } from './ui-kits.service';

describe('UiKitsService', () => {
  let service: UiKitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UiKitsService],
    }).compile();

    service = module.get<UiKitsService>(UiKitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

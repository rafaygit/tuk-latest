import { Test, TestingModule } from '@nestjs/testing';
import { TransactionMetaService } from './transaction-meta.service';

describe('TransactionMetaService', () => {
  let service: TransactionMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionMetaService],
    }).compile();

    service = module.get<TransactionMetaService>(TransactionMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

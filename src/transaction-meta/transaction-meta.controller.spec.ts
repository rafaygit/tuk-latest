import { Test, TestingModule } from '@nestjs/testing';
import { TransactionMetaController } from './transaction-meta.controller';
import { TransactionMetaService } from './transaction-meta.service';

describe('TransactionMetaController', () => {
  let controller: TransactionMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionMetaController],
      providers: [TransactionMetaService],
    }).compile();

    controller = module.get<TransactionMetaController>(TransactionMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

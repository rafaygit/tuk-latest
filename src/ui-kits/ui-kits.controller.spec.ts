import { Test, TestingModule } from '@nestjs/testing';
import { UiKitsController } from './ui-kits.controller';
import { UiKitsService } from './ui-kits.service';

describe('UiKitsController', () => {
  let controller: UiKitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UiKitsController],
      providers: [UiKitsService],
    }).compile();

    controller = module.get<UiKitsController>(UiKitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

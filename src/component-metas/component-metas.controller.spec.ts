import { Test, TestingModule } from '@nestjs/testing';
import { ComponentMetasController } from './component-metas.controller';
import { ComponentMetasService } from './component-metas.service';

describe('ComponentMetasController', () => {
  let controller: ComponentMetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentMetasController],
      providers: [ComponentMetasService],
    }).compile();

    controller = module.get<ComponentMetasController>(ComponentMetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

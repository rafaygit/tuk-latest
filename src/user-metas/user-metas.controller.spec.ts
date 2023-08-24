import { Test, TestingModule } from '@nestjs/testing';
import { UserMetasController } from './user-metas.controller';
import { UserMetasService } from './user-metas.service';

describe('UserMetasController', () => {
  let controller: UserMetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMetasController],
      providers: [UserMetasService],
    }).compile();

    controller = module.get<UserMetasController>(UserMetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { QuanlificationController } from './quanlification.controller';

describe('Quanlification Controller', () => {
  let controller: QuanlificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuanlificationController],
    }).compile();

    controller = module.get<QuanlificationController>(QuanlificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

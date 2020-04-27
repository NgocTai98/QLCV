import { Test, TestingModule } from '@nestjs/testing';
import { InfoquanlificationController } from './infoquanlification.controller';

describe('Infoquanlification Controller', () => {
  let controller: InfoquanlificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoquanlificationController],
    }).compile();

    controller = module.get<InfoquanlificationController>(InfoquanlificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

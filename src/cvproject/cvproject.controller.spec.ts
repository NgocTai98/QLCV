import { Test, TestingModule } from '@nestjs/testing';
import { CvprojectController } from './cvproject.controller';

describe('Cvproject Controller', () => {
  let controller: CvprojectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvprojectController],
    }).compile();

    controller = module.get<CvprojectController>(CvprojectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

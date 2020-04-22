import { Test, TestingModule } from '@nestjs/testing';
import { CvprojectService } from './cvproject.service';

describe('CvprojectService', () => {
  let service: CvprojectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvprojectService],
    }).compile();

    service = module.get<CvprojectService>(CvprojectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { QuanlificationService } from './quanlification.service';

describe('QuanlificationService', () => {
  let service: QuanlificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuanlificationService],
    }).compile();

    service = module.get<QuanlificationService>(QuanlificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

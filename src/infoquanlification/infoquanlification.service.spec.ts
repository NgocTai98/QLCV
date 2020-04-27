import { Test, TestingModule } from '@nestjs/testing';
import { InfoquanlificationService } from './infoquanlification.service';

describe('InfoquanlificationService', () => {
  let service: InfoquanlificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoquanlificationService],
    }).compile();

    service = module.get<InfoquanlificationService>(InfoquanlificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

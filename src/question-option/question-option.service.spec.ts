import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionOption } from './entities/question-option.entity';
import { QuestionOptionService } from './question-option.service';

describe('QuestionOptionService', () => {
  let service: QuestionOptionService;

  const mockRepository = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionOptionService,
        {
          provide: getRepositoryToken(QuestionOption),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<QuestionOptionService>(QuestionOptionService);
  });

  it('to be defined ??', () => {
    expect(service).toBeDefined();
  });

  describe('get All ()', () => {
    it('should return an array', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
});

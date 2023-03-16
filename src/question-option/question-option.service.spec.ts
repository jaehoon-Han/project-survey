import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Question } from '../question/entities/question.entity';
import { QuestionOption } from './entities/question-option.entity';
import { QuestionOptionService } from './question-option.service';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import {
  mockQuestion,
  mockQuestionOption,
  MockRepo,
} from 'src/common/___test___/mock';

const mockRepository = MockRepo;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('QuestionOptionService', () => {
  let service: QuestionOptionService;
  let entityManager: EntityManager;
  let questionOptionRepository: MockRepository<QuestionOption>;

  const questionOption = mockQuestionOption();
  const question = mockQuestion();
  const input: CreateQuestionOptionInput = {
    questionId: 1,
    score: 10,
    content: 'TEST',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QuestionOptionService,
        {
          provide: getRepositoryToken(QuestionOption),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<QuestionOptionService>(QuestionOptionService);
    entityManager = module.get<EntityManager>(EntityManager);
    questionOptionRepository = module.get<MockRepository<QuestionOption>>(
      getRepositoryToken(QuestionOption),
    );
  });

  it('TO BE DEFINED ?', () => {
    expect(service).toBeDefined();
    expect(questionOptionRepository).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  describe('create', () => {
    it('QuestionOption이 정상적으로 생성될 때', async () => {
      // Arrange
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValueOnce(question);
      jest
        .spyOn(questionOptionRepository, 'create')
        .mockReturnValueOnce(questionOption);
      jest.spyOn(entityManager, 'save').mockResolvedValueOnce(questionOption);

      // Act
      const result = await service.create(input);

      // Assert
      expect(entityManager.findOneBy).toHaveBeenCalledWith(Question, {
        id: input.questionId,
      });
      expect(questionOptionRepository.create).toHaveBeenCalledWith(input);
      expect(entityManager.save).toHaveBeenCalledWith(questionOption);
      expect(result).toEqual(questionOption);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';

type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe(' Question Service', () => {
  let questionService: QuestionService;
  let questionRepository: Repository<Question>;
  let entityManager: EntityManager;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useValue: mockRepository,
        },
        {
          provide: EntityManager,
          useValue: mockRepository,
        },
      ],
    }).compile();

    questionService = module.get<QuestionService>(QuestionService);
    questionRepository = module.get<Repository<Question>>(
      getRepositoryToken(Question),
    );
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it(' to be defined ?? ', () => {
    expect(questionRepository).toBeDefined();
    expect(questionService).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  describe('create', () => {
    it(' 질문이 정상적으로 생성됐습니다.', async () => {
      const questionInput: CreateQuestionInput = {
        surveyId: 1,
        content: '테스트',
      };

      const mockSurvey = {
        id: 1,
        title: '테스트',
        description: '테스트',
        amountQuestion: 0,
      };

      const mockQuestionOption = {
        id: 1,
        questionId: 1,
        content: '테스트',
        score: 5,
      };

      const mockQuestion = new Question();

      mockQuestion.id = 1;
      mockQuestion.content = questionInput.content;
      mockQuestion.surveyId = questionInput.surveyId;

      jest.spyOn(questionRepository, 'create').mockReturnValue(mockQuestion);
      jest.spyOn(questionRepository, 'save').mockResolvedValue(mockQuestion);

      const result = await questionService.create(questionInput);

      expect(questionRepository.create).toHaveBeenCalledWith(questionInput);
      expect(questionRepository.save).toHaveBeenCalledWith(mockQuestion);

      console.log('mockQuestion : ', mockQuestion);

      expect(result).toEqual(mockQuestion);
    });
  });
});

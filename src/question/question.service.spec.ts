import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepo, MockSurvey } from 'src/common/___test___/mock';
import { Survey } from 'src/survey/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';

describe(' Question Service', () => {
  let service: QuestionService;
  let questionRepository: Repository<Question>;
  let entityManager: EntityManager;

  const mockRepository = MockRepo;

  const questionInput: CreateQuestionInput = {
    surveyId: 1,
    content: '테스트',
  };
  const mockSurvey = MockSurvey;

  const mockQuestion = new Question();
  mockQuestion.id = 1;
  mockQuestion.content = questionInput.content;
  mockQuestion.surveyId = questionInput.surveyId;
  console.log(`BEFORE AMOUNT QUESTION : ${mockSurvey.amountQuestion}`);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    questionRepository = module.get<Repository<Question>>(
      getRepositoryToken(Question),
    );
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('TO BE DEFINED ?', () => {
    expect(questionRepository).toBeDefined();
    expect(service).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  describe('create', () => {
    it(' 질문이 정상적으로 생성될 때 Survey의 amountQuestion이 증가.', async () => {
      // Arrange
      jest.spyOn(questionRepository, 'create').mockReturnValue(mockQuestion);
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValueOnce(mockSurvey);
      jest.spyOn(entityManager, 'save').mockResolvedValue(mockQuestion);

      // Act
      const result = await service.create(questionInput);

      // Assert
      expect(entityManager.findOneBy).toHaveBeenCalledWith(Survey, {
        id: questionInput.surveyId,
      });
      expect(mockSurvey.amountQuestion).toBe(2);
      expect(result).toEqual(mockQuestion);

      console.log(`AFTER AMOUNT QUESTION : ${mockSurvey.amountQuestion}`);
    });
  });
});

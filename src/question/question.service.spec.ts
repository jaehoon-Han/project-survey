import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockQuestion,
  mockQuestionCategory,
  mockQuestionOption,
  MockRepo,
  mockSurvey,
} from 'src/common/___test___/mock';
import { QuestionCategory } from 'src/question-category/entities/question-category.entity';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';

import { Survey } from 'src/survey/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';

const mockRepository = MockRepo;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe(' Question Service', () => {
  let service: QuestionService;
  let repository: MockRepository<Question>;
  let entityManager: EntityManager;

  // Arrange
  const questionInput: CreateQuestionInput = {
    surveyId: 1,
    content: '테스트',
  };
  const survey: Survey = mockSurvey();
  const question: Question = mockQuestion();
  const questionOption: QuestionOption = mockQuestionOption();
  const questionCategory: QuestionCategory = mockQuestionCategory();

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
    repository = module.get<MockRepository<Question>>(
      getRepositoryToken(Question),
    );
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('TO BE DEFINED ?', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  describe('create', () => {
    it(' 질문이 정상적으로 생성될 때 Survey의 amountQuestion이 증가.', async () => {
      // Arrange
      const beforeAmountQuestion = (survey.amountQuestion = 1);

      // Act
      jest.spyOn(repository, 'create').mockReturnValue(question);
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValueOnce(survey);
      jest.spyOn(entityManager, 'update').mockReturnValueOnce(undefined);
      jest.spyOn(entityManager, 'save').mockResolvedValue(question);

      await service.create(questionInput);

      // Assert
      expect(entityManager.findOneBy).toHaveBeenCalledWith(Survey, {
        id: questionInput.surveyId,
      });
      expect(survey.amountQuestion).toBe(beforeAmountQuestion + 1);
    });
  });

  describe('Duplicate', () => {
    it('질문이 복제됐을때 survey의 amountQuestion도 같이 증가했는지?', async () => {
      // Arrange
      const id = 1;
      const newQuestion = new Question();
      const beforeAmount = survey.amountQuestion;

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(question);
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValue(survey);
      newQuestion.content = question.content;
      newQuestion.survey = question.survey;
      newQuestion.surveyId = question.surveyId;
      jest.spyOn(repository, 'save').mockResolvedValueOnce(newQuestion);
      const updateSpy = jest
        .spyOn(entityManager, 'update')
        .mockResolvedValueOnce(undefined);

      // Act
      await service.duplicateQuestion(id);

      // Assert
      expect(survey.amountQuestion).toBe(beforeAmount + 1);
      expect(updateSpy).toBeCalledTimes(1);
    });

    it.todo('⛔️ 질문의 연관컬럼들까지 복사하는 테스트, Map Test 필요');
    it(' 질문의 복제에 성공했을때 연관 컬럼들도 복제 성공했는지', async () => {
      // Act
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(question);
      jest
        .spyOn(entityManager, 'findBy')
        .mockResolvedValueOnce([questionOption]);
      const questionOptionSpy = jest
        .spyOn(entityManager, 'save')
        .mockResolvedValueOnce(questionOption)
        .mockResolvedValueOnce(questionOption);
      const questionCategorySpy = jest
        .spyOn(entityManager, 'save')
        .mockResolvedValueOnce(questionCategory)
        .mockResolvedValueOnce(questionCategory);

      await service.duplicateQuestion(1);

      // Assert
      expect(questionOptionSpy).toBeCalledWith(
        QuestionOption,
        1,
        questionOption,
      );
      expect(questionCategorySpy).toBeCalledWith(
        QuestionCategory,
        1,
        questionCategory,
      );
    });
  });
});

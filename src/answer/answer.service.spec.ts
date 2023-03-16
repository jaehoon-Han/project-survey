import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import {
  mockAnswer,
  mockQuestion,
  mockQuestionOption,
  MockRepo,
  mockSurveyResponse,
} from 'src/common/___test___/mock';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { CreateAnswerInput } from './dto/create-answer.input';

const mockRepository = MockRepo;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('AnswerService', () => {
  let service: AnswerService;
  let entityManager: EntityManager;
  let answerRepository: MockRepository<Answer>;

  const createAnswerInput: CreateAnswerInput = { surveyResponseId: 1 };
  const questionOptionId = 2;

  const surveyResponse = mockSurveyResponse();
  const answer = mockAnswer();
  const questionOption = mockQuestionOption();
  const question = mockQuestion();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        {
          provide: getRepositoryToken(Answer),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
    entityManager = module.get<EntityManager>(EntityManager);
    answerRepository = module.get<MockRepository<Answer>>(
      getRepositoryToken(Answer),
    );
  });

  it('TO BE DEFINED ?', () => {
    expect(service).toBeDefined();
    expect(entityManager).toBeDefined();
    expect(answerRepository).toBeDefined();
  });

  describe('create', () => {
    it('Answer가 정상적으로 생성될 때', async () => {
      // Arrange
      jest.spyOn(answerRepository, 'create').mockReturnValueOnce(answer);
      jest
        .spyOn(entityManager, 'findOneBy')
        .mockResolvedValueOnce(surveyResponse)
        .mockResolvedValueOnce(questionOption)
        .mockResolvedValueOnce(question);
      jest.spyOn(entityManager, 'save').mockResolvedValue(answer);

      // Act
      const result = await service.create(createAnswerInput, questionOptionId);

      // Assert
      expect(entityManager.findOneBy).toHaveBeenCalledTimes(3);
      expect(entityManager.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(answer);
    });

    it('Survey Response가 존재하지 않을때 Error를 던진다.', async () => {
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValueOnce(null);

      await expect(service.create(createAnswerInput, 1)).rejects.toThrowError(
        Error,
      );
    });

    describe('checkComplete', () => {
      it('checkComplete의 조건을 충족시켰을 때, isComplete를 true로, amountAnswer를 1 증가', async () => {
        // Arrange
        const surveyResponse = new SurveyResponse();
        surveyResponse.amountQuestion = 5;
        surveyResponse.amountAnswer = 5;
        surveyResponse.isComplete = false;

        const updateSpy = jest
          .spyOn(entityManager, 'update')
          .mockResolvedValueOnce(undefined);

        // Act
        await service.checkComplete(surveyResponse, 1);

        // Assert
        expect(surveyResponse.isComplete).toBe(true);
        expect(surveyResponse.amountAnswer).toBe(6);

        expect(updateSpy).toBeCalledWith(SurveyResponse, 1, surveyResponse);
      });

      it('checkComplete의 조건을 충족시켰을 때, amountAnswer를 1 증가시킨다.', async () => {
        // Arrange
        const surveyResponse = new SurveyResponse();
        surveyResponse.amountQuestion = 5;
        surveyResponse.amountAnswer = 3;
        surveyResponse.isComplete = false;

        const updateSpy = jest
          .spyOn(entityManager, 'update')
          .mockResolvedValueOnce(undefined);

        // Act
        await service.checkComplete(surveyResponse, 1);

        // Assert
        expect(surveyResponse.amountAnswer).toBe(4);
        expect(updateSpy).toBeCalledWith(SurveyResponse, 1, surveyResponse);
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import {
  MockQuestion,
  MockQuestionOption,
  MockRepo,
  MockSurveyResponse,
} from 'src/common/___test___/mock';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';

describe('AnswerService', () => {
  let service: AnswerService;
  let entityManager: EntityManager;
  let answerRepository: Repository<Answer>;

  const mockRepository = MockRepo;

  const createAnswerInput = { surveyResponseId: 1 };
  const questionOptionId = 2;
  const question = MockQuestion;
  const surveyResponse = MockSurveyResponse;
  const questionOption = MockQuestionOption;

  const answer = new Answer();
  answer.id = 1;
  answer.question = question.content;
  answer.questionOption = questionOption.content;
  answer.score = questionOption.score;

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
    answerRepository = module.get<Repository<Answer>>(
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

  describe('remove', () => {
    it.todo('🙏service의 rebuilding이 필요 !');
    it('Fail Case : Answer를 remove할 때, surveyResponse의 amountAnswer를 감소시킨다.', async () => {
      // Arrange
      const surveyResponse = new SurveyResponse();
      surveyResponse.amountQuestion = 5;
      surveyResponse.amountAnswer = 3;
      surveyResponse.isComplete = false;

      jest.spyOn(answerRepository, 'create').mockReturnValueOnce(answer);
      jest
        .spyOn(entityManager, 'findOneBy')
        .mockResolvedValueOnce(surveyResponse)
        .mockResolvedValueOnce(questionOption)
        .mockResolvedValueOnce(question);
      jest.spyOn(entityManager, 'save').mockResolvedValue(answer);
      jest.spyOn(entityManager, 'remove').mockResolvedValueOnce(null);

      // Act
      await service.remove(1);

      // Assert
      expect(surveyResponse.amountAnswer).toBe(2);
      // expect(updateSpy).toBeCalledWith(SurveyResponse, 1, surveyResponse);
    });
  });
});

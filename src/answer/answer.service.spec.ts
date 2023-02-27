import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import { DataSource, EntityManager } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('AnswerService', () => {
  let answerService: AnswerService;
  let answerRepositoryMock: any;
  let entityManagerMock: any;
  let dataSourceMock: any;

  beforeEach(async () => {
    answerRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      findOneById: jest.fn(),
      findQuestionOptionContent: jest.fn(),
      findQuestionOptionScore: jest.fn(),
      findQuestionContent: jest.fn(),
      findQuestionId: jest.fn(),
      findQuestion: jest.fn(),
      checkComplete: jest.fn(),
    };

    entityManagerMock = {
      findOneById: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        {
          provide: getRepositoryToken(Answer),
          useValue: answerRepositoryMock,
        },
        {
          provide: EntityManager,
          useValue: entityManagerMock,
        },
        {
          provide: DataSource,
          useValue: answerRepositoryMock,
        },
      ],
    }).compile();

    answerService = module.get<AnswerService>(AnswerService);
    dataSourceMock = module.get<DataSource>(DataSource);
    entityManagerMock = module.get<EntityManager>(EntityManager);
  });

  it('to be defined ??', () => {
    expect(answerService).toBeDefined();
    expect(dataSourceMock).toBeDefined();
    expect(entityManagerMock).toBeDefined();
  });

  describe('create', () => {
    it('👊 Answer 가 정상적으로 생성될 때 ', async () => {
      const createAnswerInput = {
        surveyResponseId: 1,
      };
      const questionOptionId = 1;
      const surveyResponse = {
        id: 1,
        amountAnswer: 0,
        amountQuestion: 1,
        isComplete: false,
      };
      const questionOption = {
        id: 1,
        score: 1,
        content: '밀키스',
      };
      const question = {
        id: 1,
        content: 'some question content',
      };

      entityManagerMock.findOneById.mockResolvedValueOnce(surveyResponse);

      answerRepositoryMock.create.mockReturnValueOnce({
        ...createAnswerInput,
        questionOption,
        score: questionOption.score,
        question,
      });

      answerRepositoryMock.save.mockResolvedValueOnce({
        ...createAnswerInput,
        questionOption,
        score: questionOption.score,
        question,
      });

      const result = await answerService.create(
        createAnswerInput,
        questionOptionId,
      );

      console.log('result : ', result);

      expect(entityManagerMock.findOneById).toHaveBeenCalledWith(
        'SurveyResponse',
        createAnswerInput.surveyResponseId,
      );
      expect(answerService.checkComplete).toHaveBeenCalledWith(
        surveyResponse,
        createAnswerInput.surveyResponseId,
      );
      expect(entityManagerMock.findOneById).toHaveBeenCalledWith(
        'QuestionOption',
        questionOptionId,
      );
      expect(answerService.findQuestionId).toHaveBeenCalledWith(
        questionOptionId,
      );
      expect(entityManagerMock.findOneById).toHaveBeenCalledWith(
        'Question',
        question.content,
      );
      expect(answerRepositoryMock.create).toHaveBeenCalledWith({
        ...createAnswerInput,
        questionOption,
        score: questionOption.score,
        question,
      });
      expect(answerRepositoryMock.save).toHaveBeenCalledWith({
        ...createAnswerInput,
        questionOption,
        score: questionOption.score,
        question,
      });
      expect(result).toEqual({
        ...createAnswerInput,
        questionOption,
        score: questionOption.score,
        question,
      });
    });
  });

  describe('findOne', () => {
    it(' Answer를 id로 찾을때, 존재하지 않으면 BadRequestException 을 던져준다. ', async () => {
      const id = 1;
      answerRepositoryMock.findOneBy.mockResolvedValueOnce(null);

      await expect(answerService.findOne(id)).rejects.toThrowError(
        'NOT FOUND ANSWER ID: 1',
      );

      expect(answerRepositoryMock.findOneBy).toHaveBeenCalledWith({ id });
    });

    it(' Answer가 존재하면 return 해준다. ', async () => {
      const id = 1;
      const answer = {
        id: 1,
        surveyResponseId: 1,
        content: 'some answer content',
        questionOption: {},
        score: 0,
        question: {},
      };

      jest
        .spyOn(answerService, 'findOne')
        .mockResolvedValueOnce(answerRepositoryMock);

      const result = await answerService.findOne(id);

      expect(result).toBe(answer);
    });

    it(' Answer를 id로 찾을때, 존재하지 않으면 BadRequestException 을 던져준다. ', async () => {
      const id = 1;
      const error = new BadRequestException(`NOT FOUND ANSWER ID: ${id}`);

      jest.spyOn(answerService, 'findOne').mockRejectedValueOnce(error);

      await expect(answerService.findOne(id)).rejects.toThrowError(error);
    });
  });
});

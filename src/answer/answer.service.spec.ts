import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import { EntityManager, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { expect, jest, test } from '@jest/globals';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';

type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('AnswerService', () => {
  it.todo('mock data 생성하기.');
  it.todo('분리 작업');
  it.todo('findOneById 를 findOneBy로 교체하고 where문 쓰기');
  let answerService: AnswerService;
  let answerRepository: MockRepository<Answer>;
  let entityManager: EntityManager;

  const mockRepository = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    findOneBy: jest.fn(),
  });

  const entityManagerMock = () => ({
    findOneBy: jest.fn(),
    update: jest.fn(),
  });

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
          useValue: entityManagerMock(),
        },
      ],
    }).compile();

    answerService = await module.get<AnswerService>(AnswerService);
    answerRepository = await module.get(getRepositoryToken(Answer));
    entityManager = await module.get<EntityManager>(EntityManager);
    jest.clearAllMocks();
  });

  it('to be defined ??', () => {
    expect(answerService).toBeDefined();
    expect(answerRepository).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  describe('create Answer', () => {
    it.todo('answer가 정상적으로 생성됐을 때');
    it.todo('answer가 비정상적으로 입력됐을 때');
    it(' Answer 가 정상적으로 생성될 때 ', async () => {
      jest.mock('../src/mock.ts', () => ({
        createAnswer: jest.fn(),
        checkComplete: jest.fn(),
      }));

      const createAnswerInput = {
        surveyResponseId: 1,
      };
      const questionOptionId = 1;
      const newAnswer = new Answer();

      const result = await answerService.create(
        createAnswerInput,
        questionOptionId,
      );
      newAnswer.id = 1;
      newAnswer.score = 10;
      newAnswer.surveyResponseId = 1;

      console.log('result : ', result);
      const QuestionOptionMock = {
        id: 1,
        questionId: 1,
        score: 777,
        content: '밀키스',
      };

      const surveyResponseMock = {
        id: 1,
        totalScore: 0,
        amountAnswer: 0,
        amountQuestion: 1,
        isComplete: false,
        surveyId: 1,
        userId: 1,
      };

      const QuestionMock = {
        id: 1,
        content: '밀키스',
      };
      // const findOneByIdMock = jest.fn();
      // findOneByIdMock.mockReturnValueOnce(surveyResponseMock);
      // console.log('findOneByIdMock : ', findOneByIdMock);
      // jest
      //   .spyOn(entityManager, 'findOneBy')
      //   .mockRejectedValueOnce(SurveyResponseMock);
      // entityManagerMock.findOneBy.mockResolvedValueOnce(surveyResponseMock);

      // answerRepository.create.mockReturnValueOnce({
      //   ...createAnswerInput,
      //   questionOption,
      //   score: questionOption.score,
      //   question,
      // });

      // answerRepository.save.mockResolvedValueOnce({
      //   ...createAnswerInput,
      //   questionOption,
      //   score: questionOption.score,
      //   question,
      // });

      // const mockAnswer = {
      //   id: 1,
      //   question: question.content,
      //   questionOption: questionOption.content,
      //   score: questionOption.score,
      //   surveyResponseId: createAnswerInput.surveyResponseId,
      //   surveyResponse: surveyResponse,
      // };

      //toHaveBeenCalledWith :

      // expect(entityManagerMock.findOneById).toHaveBeenCalledWith(
      //   'SurveyResponse',
      //   createAnswerInput.surveyResponseId,
      // );

      // expect(answerService.checkComplete).toHaveBeenCalledWith(
      //   surveyResponse,
      //   createAnswerInput.surveyResponseId,
      // );

      // expect(entityManagerMock.findOneById).toHaveBeenCalledWith(
      //   'QuestionOption',
      //   questionOptionId,
      // );

      // expect(answerService.findQuestionId).toHaveBeenCalledWith(
      //   questionOptionId,
      // );

      // expect(entityManagerMock.findOneById).toHaveBeenCalledWith(
      //   'Question',
      //   question.content,
      // );

      // expect(answerRepository.create).toHaveBeenCalledWith({
      //   ...createAnswerInput,
      //   questionOption,
      //   score: questionOption.score,
      //   question,
      // });

      // expect(answerRepository.save).toHaveBeenCalledWith({
      //   ...createAnswerInput,
      //   questionOption,
      //   score: questionOption.score,
      //   question,
      // });

      // console.log('mockAnser : ', mockAnswer);

      // expect(result).toEqual(mockAnswer);

      // expect(result).toEqual({
      //   ...createAnswerInput,
      //   questionOption,
      //   score: questionOption.score,
      //   question,
      // });
    });
  });

  describe('findOne', () => {
    // it(' Answer를 findOne할 때, 존재하지 않으면 BadRequestException 을 던져준다. ', async () => {
    //   const id = 1;
    //   answerRepository.findOneBy.mockResolvedValueOnce(null);
    //   // answerRepositoryMock.findOneBy.mockReturnValueOnce(null);

    //   //예외 발생 여부를 테스트 할때는 toThrow()
    //   await expect(answerService.findOne(id)).rejects.toThrowError(
    //     'NOT FOUND ANSWER ID: 1',
    //   );

    //   expect(answerRepository.findOneBy).toHaveBeenCalledWith({ id });
    // });

    // it(' Answer를 id로 찾을때, 존재하지 않으면 BadRequestException 을 던져준다. ', async () => {
    //   const id = 1;
    //   const error = new BadRequestException(`NOT FOUND ANSWER ID: ${id}`);

    //   jest.spyOn(answerService, 'findOne').mockRejectedValueOnce(error);

    //   await expect(answerService.findOne(id)).rejects.toThrowError(error);
    // });

    it(' Answer가 존재하면 return 해준다. ', async () => {
      // const id = 1;
      // const answer = {
      //   id: 1,
      //   surveyResponseId: 1,
      //   content: '밀키스',
      //   questionOption: {},
      //   score: 77,
      //   question: {},
      // };
      // jest // 해당 함수의 호출여부와 어떻게 호출되었는지만 알아내야 할 때
      //   .spyOn(answerService, 'findOne')
      //   .mockResolvedValueOnce(answerRepository);
      // const result = await answerService.findOne(id);
      // expect(result).toEqual(answer);
    });

    it(' Answer를 생성할 때, surveyResponse의 isComplete가 이미 true 일 때', async () => {
      // answerRepositoryMock.checkComplete.mockRejectedValueOnce(true);
      // answerService.checkComplete(false)
      // await expect(
      //   answerService.findOne(1).checkComplete(false),
      // // ).rejects.toThrowError('모든 설문을 이미 응답하였습니다.');
      // const newAnswer = new Answer();
      // const surveyResponse = {
      //   id: 1,
      //   amountAnswer: 0,
      //   amountQuestion: 1,
      //   isComplete: true,
      // };
      // jest.spyOn(answerRepository, 'save').mockResolvedValue(newAnswer);
    });
  });
});

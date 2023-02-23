import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';

type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('AnswerService', () => {
  let answerService: AnswerService;
  let answerRepository: Repository<Answer>;
  let entityManager: EntityManager;
  let dataSource: DataSource;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findOneById: jest.fn(),
    findQuestionOptionContent: jest.fn(),
    findQuestionOptionScore: jest.fn(),
    findQuestionContent: jest.fn(),
    findQuestionId: jest.fn(),
    checkComplete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        {
          provide: getRepositoryToken(Answer),
          useValue: mockRepository,
        },
        {
          provide: DataSource,
          useValue: mockRepository,
        },
        {
          provide: EntityManager,
          useValue: mockRepository,
        },
      ],
    }).compile();

    answerService = module.get<AnswerService>(AnswerService);
    answerRepository = module.get<Repository<Answer>>(
      getRepositoryToken(Answer),
    );
    entityManager = module.get<EntityManager>(EntityManager);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('to be defined ??', () => {
    expect(answerService).toBeDefined();
    expect(answerRepository).toBeDefined();
    expect(dataSource).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  it('정상적으로 Answer가 생성되는 경우', async () => {
    const mockAnswer = new Answer();

    const mockCreateAnswerInput = {
      question: '질문이요 ~',
      questionOption: '질문사항이여 ~',
      score: 10,
      surveyResponseId: 1,
    };
    const mockQuestionOptionId = 1;

    const mockQuestionOption = {
      id: 1,
      score: 777,
      questionId: 1,
      content: '밀키스 좋아요~',
    };

    const mockSurveyResponse = {
      id: 1,
      totalScore: 20,
      amountAnswer: 2,
      amountQuestion: 3,
      isComplete: false,
      surveyId: 1,
      userId: 1,
    };

    answerRepository.create(mockCreateAnswerInput);
    mockAnswer.question = mockCreateAnswerInput.question;
    mockAnswer.questionOption = mockCreateAnswerInput.questionOption;
    mockAnswer.score = mockCreateAnswerInput.score;
    mockAnswer.surveyResponseId = mockCreateAnswerInput.surveyResponseId;

    const mockAnswerRepositorySaveSpy = jest
      .spyOn(mockRepository, 'save')
      .mockResolvedValue(2);

    console.log('mock spy on : ', mockAnswerRepositorySaveSpy);

    console.log(
      mockRepository.checkComplete(
        mockSurveyResponse,
        mockCreateAnswerInput.surveyResponseId,
      ),
    );
    console.log('question Option Id = ', mockQuestionOption.score);

    console.log('mockAnswer : ', mockAnswer);

    //     const createAnswerInput = {
    //       surveyResponseId: 1,
    //     };
    //     const questionOptionId = 1;

    //     mockAnswerRepository.create.mockReturnValue(mockAnswer);
    //     const mockResult = await answerService.create(
    //       createAnswerInput,
    //       questionOptionId,
    //     );

    //     mockAnswer.surveyResponseId = createAnswerInput.surveyResponseId;
    //     console.log(mockAnswer);

    //     const mockSurveyResponse = {
    //       amountQuestion: 1,
    //       amountAnswer: 0,
    //       isComplete: false,
    //     };

    //     entityManager.findOneById.mockResolvedValue(mockSurveyResponse);
    //     entityManager.save.mockResolvedValue(mockAnswer);

    //     const result = await answerService.create(
    //       mockCreateAnswerInput,
    //       mockQuestionOptionId,
    //     );

    //     expect(mockAnswerRepository.create).toHaveBeenCalledWith(
    //       mockCreateAnswerInput,
    //     );
    //     expect(entityManager.findOneById).toHaveBeenCalledWith(
    //       expect.any(Function),
    //       mockCreateAnswerInput.surveyResponseId,
    //     );
    //     expect(entityManager.update).toHaveBeenCalledWith(
    //       expect.any(Function),
    //       mockCreateAnswerInput.surveyResponseId,
    //       {
    //         amountQuestion: 1,
    //         amountAnswer: 1,
    //         isComplete: true,
    //       },
    //     );
    //     expect(mockAnswerRepository.save).toHaveBeenCalledWith(mockAnswer);
    //     expect(result).toEqual(mockAnswer);
    //   });
  });
});

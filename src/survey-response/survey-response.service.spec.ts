import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepo, MockSurvey } from 'src/common/___test___/mock';
import { Survey } from 'src/survey/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { SurveyResponse } from './entities/survey-response.entity';
import { SurveyResponseService } from './survey-response.service';

describe('SurveyResponseService', () => {
  let service: SurveyResponseService;
  let surveyResponseRepo: Repository<SurveyResponse>;
  let entityManager: EntityManager;

  const mockRepository = MockRepo;

  const survey = MockSurvey;
  const input = { surveyId: 1, userId: 1, totalScore: 0 };

  const surveyResponse = new SurveyResponse();
  surveyResponse.id = 1;
  surveyResponse.amountAnswer = 1;
  surveyResponse.amountQuestion = 1;
  surveyResponse.totalScore = 0;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyResponseService,
        {
          provide: getRepositoryToken(SurveyResponse),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = await module.get<SurveyResponseService>(SurveyResponseService);
    surveyResponseRepo = await module.get<Repository<SurveyResponse>>(
      getRepositoryToken(SurveyResponse),
    );
    entityManager = await module.get<EntityManager>(EntityManager);
  });

  it('TO BE DEFINED ?', () => {
    expect(service).toBeDefined();
    expect(surveyResponseRepo).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  describe('create', () => {
    it('surveyResponse가 정상적으로 생성될 때', async () => {
      // Arrange
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValueOnce(survey);
      jest
        .spyOn(surveyResponseRepo, 'create')
        .mockReturnValueOnce(surveyResponse);
      jest
        .spyOn(surveyResponseRepo, 'save')
        .mockResolvedValueOnce(surveyResponse);

      // Act
      const result = await service.create(input);

      // Assert
      expect(entityManager.findOneBy).toHaveBeenCalledWith(Survey, {
        id: input.surveyId,
      });
      expect(surveyResponseRepo.create).toHaveBeenCalledWith(input);
      expect(surveyResponseRepo.save).toHaveBeenCalledWith(surveyResponse);
      expect(result).toEqual(surveyResponse);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SurveyService } from './survey.service';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { MockRepo, mockSurvey } from 'src/common/___test___/mock';

const mockRepository = MockRepo;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('SurveyService', () => {
  let surveyService: SurveyService;
  let surveyRepository: MockRepository<Survey>;
  let entityManager: EntityManager;

  const survey = mockSurvey();
  const createSurveyInput = {
    title: 'Test Title',
    description: 'Test Description',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: getRepositoryToken(Survey),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    surveyService = module.get<SurveyService>(SurveyService);
    entityManager = module.get<EntityManager>(EntityManager);
    surveyRepository = module.get<MockRepository<Survey>>(
      getRepositoryToken(Survey),
    );
  });

  it('TO BE DEFINED ?', () => {
    expect(surveyRepository).toBeDefined();
    expect(surveyService).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  describe('Create', () => {
    it('정상적으로 설문이 생성되는 경우', async () => {
      // Arrange
      jest.spyOn(surveyRepository, 'create').mockReturnValueOnce(survey);
      jest.spyOn(surveyRepository, 'save').mockResolvedValue(survey);

      // Act
      const result = await surveyService.create(createSurveyInput);

      // Assert
      expect(result).toEqual(survey);
      expect(result.amountQuestion).toBe(0);
    });
  });
});

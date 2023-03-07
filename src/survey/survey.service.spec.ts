import { Test, TestingModule } from '@nestjs/testing';
import { SurveyService } from './survey.service';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { MockRepo } from 'src/common/___test___/mock';

describe('SurveyService', () => {
  let surveyService: SurveyService;
  let surveyRepository: Repository<Survey>;
  let entityManager: EntityManager;

  const mockRepository = MockRepo;

  const createSurveyInput = {
    title: 'Test Title',
    description: 'Test Description',
  };
  const newSurvey = new Survey();
  newSurvey.title = 'Test TTT';
  newSurvey.description = 'Test DDD';

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
    surveyRepository = module.get<Repository<Survey>>(
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
      jest.spyOn(surveyRepository, 'create').mockReturnValueOnce(newSurvey);
      // jest.spyOn(entityMa);
      jest.spyOn(surveyRepository, 'save').mockResolvedValue(newSurvey);

      // Act
      const result = await surveyService.create(createSurveyInput);

      // Assert
      expect(result).toEqual(newSurvey);
      expect(result.amountQuestion).toBe(0);
    });
  });

  describe('Update', () => {
    it('업데이트 되는지', async () => {
      // Arrange
      const newSurvey = new Survey();

      // Act

      // Assert
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockCategory,
  MockRepo,
  mockResponseCategory,
  mockSurvey,
  mockSurveyResponse,
} from 'src/common/___test___/mock';
import { EntityManager, Repository } from 'typeorm';
import { ResponseCategory } from './entities/response-category.entity';
import { ResponseCategoryService } from './response-category.service';

const mockRepository = MockRepo;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ResponseCategoryService', () => {
  let service: ResponseCategoryService;
  let entityManager: EntityManager;
  let repository: MockRepository<ResponseCategory>;

  const category = mockCategory();
  const responseCategory = mockResponseCategory();
  const survey = mockSurvey();
  const surveyResponse = mockSurveyResponse();
  const input = { surveyId: 1, surveyResponseId: 1 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponseCategoryService,
        {
          provide: getRepositoryToken(ResponseCategory),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<ResponseCategoryService>(ResponseCategoryService);
    entityManager = module.get<EntityManager>(EntityManager);
    repository = module.get<MockRepository<ResponseCategory>>(
      getRepositoryToken(ResponseCategory),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(entityManager).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Create', () => {
    it('유형별로 분류가 정상적으로 되어서 바인딩 되는지', async () => {
      // Arrange
      jest
        .spyOn(entityManager, 'findOneBy')
        .mockResolvedValueOnce(surveyResponse);
      jest.spyOn(entityManager, 'findOne').mockResolvedValueOnce(survey);
      jest.spyOn(entityManager, 'findOne').mockResolvedValueOnce(category);
      jest.spyOn(repository, 'create').mockReturnValueOnce(responseCategory);
      jest.spyOn(entityManager, 'save').mockResolvedValue(responseCategory);

      // Act
      await service.create(input);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(input);
      expect(repository.save).toHaveBeenCalledWith(responseCategory);
    });

    // it('map Unit Test', async () => {

    // });
    it('유형별로 분류된 점수들의 합산이 제대로 이루어지고 바인딩 되는지', async () => {
      // QUERY BUILDER가 사용되는데..
      // Arrange
      // Act
      // Assert
    });
    it('합산된 점수로 비교한 후, 그에 맞는 안내메세지가 제대로 저장되는지', async () => {
      // Arrange
      // Act
      // Assert
    });

    it('정상적으로 생성되는 경우', async () => {
      // Arrange
      // jest.spyOn.findOne해서 survey하고 create surveyResponse하고
      // Act
      // Assert
    });
  });
});

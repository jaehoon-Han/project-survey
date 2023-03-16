import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import {
  mockCategory,
  mockCategoryScore,
  MockRepo,
} from 'src/common/___test___/mock';
import { EntityManager, Repository } from 'typeorm';
import { CategoryScoreService } from './category-score.service';
import { CreateCategoryScoreInput } from './dto/create-category-score.input';
import { CategoryScore } from './entities/category-score.entity';

const mockRepository = MockRepo;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CategoryScoreService', () => {
  let service: CategoryScoreService;
  let entityManager: EntityManager;
  let repository: MockRepository<CategoryScore>;

  const categoryScore: CategoryScore = mockCategoryScore();
  const category: Category = mockCategory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryScoreService,
        {
          provide: getRepositoryToken(CategoryScore),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<CategoryScoreService>(CategoryScoreService);
    entityManager = module.get<EntityManager>(EntityManager);
    repository = module.get<MockRepository<CategoryScore>>(
      getRepositoryToken(CategoryScore),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(entityManager).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('CREATE', () => {
    it('create가 정상적으로 생성될 때', async () => {
      // Arrange
      const input: CreateCategoryScoreInput = {
        categoryId: 1,
        message: 'TEST',
        minScore: 33,
        maxScore: 66,
      };

      // Act
      jest.spyOn(repository, 'create').mockReturnValueOnce(categoryScore);
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValueOnce(category);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(categoryScore);

      await service.create(input);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(input);
      expect(entityManager.findOneBy).toHaveBeenCalledWith(Category, {
        id: category.id,
      });
      expect(repository.save).toHaveBeenCalledWith(categoryScore);
    });
  });
});

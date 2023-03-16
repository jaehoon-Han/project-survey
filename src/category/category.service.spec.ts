import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockCategory, MockRepo, mockSurvey } from 'src/common/___test___/mock';
import { Survey } from 'src/survey/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';

const mockRepository = MockRepo;

describe('CategoryService', () => {
  let service: CategoryService;
  let entityManager: EntityManager;
  let categoryRepository: Repository<Category>;

  const category: Category = mockCategory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    entityManager = module.get<EntityManager>(EntityManager);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(entityManager).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  describe('create', () => {
    it('create input 에 surveyId를 넣지 않고 생성할 때', async () => {
      // Arrange
      const input: CreateCategoryInput = {
        categoryName: '테스트',
        surveyId: 1,
      };

      // Act
      jest.spyOn(categoryRepository, 'create').mockReturnValue(category);
      jest.spyOn(categoryRepository, 'save').mockResolvedValue(category);

      await service.create(input);

      // Assert
      expect(categoryRepository.create).toHaveBeenCalledWith(input);
      expect(categoryRepository.save).toHaveBeenCalledWith(category);
    });
  });
});

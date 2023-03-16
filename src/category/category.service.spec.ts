import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockCategory, MockRepo } from 'src/common/___test___/mock';

import { EntityManager, Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';

const mockRepository = MockRepo;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CategoryService', () => {
  let service: CategoryService;
  let entityManager: EntityManager;
  let repository: MockRepository<Category>;

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
    repository = module.get<MockRepository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(entityManager).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('create input 에 surveyId를 넣지 않고 생성할 때', async () => {
      // Arrange
      const input: CreateCategoryInput = {
        categoryName: '테스트',
        surveyId: 1,
      };

      // Act
      jest.spyOn(repository, 'create').mockReturnValue(category);
      jest.spyOn(repository, 'save').mockResolvedValue(category);

      await service.create(input);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(input);
      expect(repository.save).toHaveBeenCalledWith(category);
    });
  });

  describe('Querybuiler Unit Test는 E2E에서 진행한다 하였지만..', () => {
    it('it should call createQueryBuilder', async () => {
      // Arrange
      const id = 1;
      jest.spyOn(repository, 'findOneBy').mockReturnValue(category);

      // Act
      await service.testingQueryBuilder(id);

      repository.findOne.mockResolvedValue(undefined);

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(
        repository.createQueryBuilder().leftJoinAndSelect,
      ).toHaveBeenCalledTimes(1);

      jest
        .spyOn(repository.createQueryBuilder(), 'getMany')
        .mockResolvedValue([]);

      const result = await service.testingQueryBuilder(id);

      expect(repository.createQueryBuilder().getMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('제대로된 결과값을 return 할 경우', async () => {
      // Arrange
      const id = 1;

      // Act
      jest.spyOn(repository, 'findOneBy').mockReturnValue(category);
      jest
        .spyOn(repository.createQueryBuilder(), 'getMany')
        .mockResolvedValue(category);
      const result = await service.testingQueryBuilder(id);

      // Assert
      expect(repository.createQueryBuilder().getMany).toHaveBeenCalled();
      expect(result).toEqual({
        id: 1,
        categoryName: '테스트',
        createdAt: undefined,
        updatedAt: undefined,
        categoryScore: undefined,
        questionCategory: undefined,
        surveyId: undefined,
        survey: undefined,
      });
    });
  });
});

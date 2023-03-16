import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import {
  mockCategory,
  mockQuestion,
  mockQuestionCategory,
  MockRepo,
} from 'src/common/___test___/mock';
import { Question } from 'src/question/entities/question.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionCategoryInput } from './dto/create-question-category.input';
import { QuestionCategory } from './entities/question-category.entity';
import { QuestionCategoryService } from './question-category.service';

const mockRepository = MockRepo;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CategoryService', () => {
  let service: QuestionCategoryService;
  let entityManager: EntityManager;
  let categoryRepository: MockRepository<QuestionCategory>;

  const questionCategory: QuestionCategory = mockQuestionCategory();
  const question: Question = mockQuestion();
  const category: Category = mockCategory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionCategoryService,
        {
          provide: getRepositoryToken(QuestionCategory),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<QuestionCategoryService>(QuestionCategoryService);
    entityManager = module.get<EntityManager>(EntityManager);
    categoryRepository = module.get<MockRepository<QuestionCategory>>(
      getRepositoryToken(QuestionCategory),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(entityManager).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  describe('create', () => {
    it('create가 정상적으로 생성될 때', async () => {
      // Arrange
      const input: CreateQuestionCategoryInput = {
        categoryId: 1,
        questionId: 1,
      };

      // Act
      jest
        .spyOn(categoryRepository, 'create')
        .mockReturnValue(questionCategory);
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValueOnce(category);
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValueOnce(question);
      jest
        .spyOn(categoryRepository, 'save')
        .mockResolvedValue(questionCategory);

      await service.create(input);

      // Assert
      expect(categoryRepository.create).toHaveBeenCalledWith(input);
      expect(categoryRepository.save).toHaveBeenCalledWith(questionCategory);
    });
  });
});

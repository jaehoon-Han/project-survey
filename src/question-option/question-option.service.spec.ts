import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Question } from '../question/entities/question.entity';
import { QuestionOption } from './entities/question-option.entity';
import { QuestionOptionService } from './question-option.service';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { MockQuestionOption, MockRepo } from 'src/common/___test___/mock';

describe('QuestionOptionService', () => {
  let service: QuestionOptionService;
  let entityManager: EntityManager;
  let questionOptionRepository: Repository<QuestionOption>;

  const mockRepository = MockRepo;

  const createQuestionOptionInput: CreateQuestionOptionInput =
    MockQuestionOption;

  const questionOption = new QuestionOption();
  questionOption.id = 1;
  questionOption.content = createQuestionOptionInput.content;
  questionOption.score = createQuestionOptionInput.score;

  const question = new Question();
  question.id = createQuestionOptionInput.questionId;
  questionOption.question = question;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QuestionOptionService,
        {
          provide: getRepositoryToken(QuestionOption),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<QuestionOptionService>(QuestionOptionService);
    questionOptionRepository = module.get(getRepositoryToken(QuestionOption));
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('TO BE DEFINED ?', () => {
    expect(service).toBeDefined();
    expect(questionOptionRepository).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  describe('create', () => {
    it('QuestionOption이 정상적으로 생성될 때', async () => {
      // Arrange
      jest.spyOn(entityManager, 'findOneBy').mockResolvedValueOnce(question);
      jest
        .spyOn(questionOptionRepository, 'create')
        .mockReturnValueOnce(questionOption);
      jest.spyOn(entityManager, 'save').mockResolvedValueOnce(questionOption);

      // Act
      const result = await service.create(createQuestionOptionInput);

      // Assert
      expect(entityManager.findOneBy).toHaveBeenCalledWith(Question, {
        id: createQuestionOptionInput.questionId,
      });
      expect(questionOptionRepository.create).toHaveBeenCalledWith(
        createQuestionOptionInput,
      );
      expect(entityManager.save).toHaveBeenCalledWith(questionOption);
      expect(result).toEqual(questionOption);
    });
  });
});

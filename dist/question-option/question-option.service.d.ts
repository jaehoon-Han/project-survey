import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';
import { QuestionOption } from './entities/question-option.entity';
export declare class QuestionOptionService {
    private questionOptionRepository;
    private entityManager;
    private dataSource;
    constructor(questionOptionRepository: Repository<QuestionOption>, entityManager: EntityManager, dataSource: DataSource);
    create(createQuestionOptionInput: CreateQuestionOptionInput): Promise<QuestionOption>;
    findAll(): Promise<QuestionOption[]>;
    findOne(id: number): Promise<QuestionOption>;
    update(id: number, updateQuestionOptionInput: UpdateQuestionOptionInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<QuestionOption>;
}

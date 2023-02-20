import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
export declare class QuestionService {
    private questionRepository;
    private entityManager;
    private dataSource;
    constructor(questionRepository: Repository<Question>, entityManager: EntityManager, dataSource: DataSource);
    create(createQuestionInput: CreateQuestionInput): Promise<Question>;
    findAll(): Promise<Question[]>;
    findOne(id: number): Promise<Question>;
    findDetail(id: number): Promise<Question[]>;
    update(id: number, updateQuestionInput: UpdateQuestionInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Question>;
}

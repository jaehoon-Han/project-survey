import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';
export declare class AnswerService {
    private answerRepository;
    private entityManager;
    private dataSource;
    constructor(answerRepository: Repository<Answer>, entityManager: EntityManager, dataSource: DataSource);
    create(createAnswerInput: CreateAnswerInput): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    update(id: number, updateAnswerInput: UpdateAnswerInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}

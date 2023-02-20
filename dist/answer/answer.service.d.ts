import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Question } from 'src/question/entities/question.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';
export declare class AnswerService {
    private answerRepository;
    private entityManager;
    private dataSource;
    constructor(answerRepository: Repository<Answer>, entityManager: EntityManager, dataSource: DataSource);
    create(createAnswerInput: CreateAnswerInput, questionOptionId: number): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    update(id: number, updateAnswerInput: UpdateAnswerInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findQuestion(questionId: number): Promise<Question>;
    findQuestionId(questionOptionId: number): Promise<number>;
    findQuestionContent(questionId: number): Promise<string>;
    findQuestionOption(questionOptionId: number): Promise<QuestionOption>;
    findQuestionOptionContent(questionOptionId: number): Promise<string>;
    findQuestionOptionScore(questionOptionId: number): Promise<number>;
}

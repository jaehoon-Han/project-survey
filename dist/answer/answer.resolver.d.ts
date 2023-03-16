import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
export declare class AnswerResolver {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(createAnswerInput: CreateAnswerInput, questionOptionid: number): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    findOneTest(id: number): Promise<import("../question-category/entities/question-category.entity").QuestionCategory[]>;
    update(input: UpdateAnswerInput): Promise<Answer>;
    remove(id: number): Promise<Answer>;
}

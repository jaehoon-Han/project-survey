import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
export declare class AnswerResolver {
    private readonly answerService;
    constructor(answerService: AnswerService);
    createAnswer(createAnswerInput: CreateAnswerInput): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    updateAnswer(updateAnswerInput: UpdateAnswerInput): Promise<import("typeorm").UpdateResult>;
    removeAnswer(id: number): Promise<import("typeorm").DeleteResult>;
}

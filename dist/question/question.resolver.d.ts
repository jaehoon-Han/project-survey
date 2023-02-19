import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
export declare class QuestionResolver {
    private readonly questionService;
    constructor(questionService: QuestionService);
    createQuestion(createQuestionInput: CreateQuestionInput): Promise<Question>;
    findAllQuestion(): Promise<Question[]>;
    findOne(id: number): Promise<Question>;
    findDetail(id: number): Promise<Question[]>;
    updateQuestion(updateQuestionInput: UpdateQuestionInput): Promise<import("typeorm").UpdateResult>;
    removeQuestion(id: number): Promise<import("typeorm").DeleteResult>;
}

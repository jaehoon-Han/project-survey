import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
export declare class QuestionResolver {
    private readonly questionService;
    constructor(questionService: QuestionService);
    createQuestion(createQuestionInput: CreateQuestionInput): Promise<Question>;
    findAll(): Promise<Question[]>;
    findOne(id: number): Promise<Question>;
    findDetail(id: number): Promise<Question[]>;
    findOneCategoryOfQuestion(id: number): Promise<Question[]>;
    findAllCategoryOfQuestion(surveyId: number): Promise<Question[]>;
    update(updateQuestionInput: UpdateQuestionInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Question>;
    replicateQuestion(id: number): Promise<Question>;
}

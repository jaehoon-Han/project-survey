import { QuestionOptionService } from './question-option.service';
import { QuestionOption } from './entities/question-option.entity';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';
export declare class QuestionOptionResolver {
    private readonly questionOptionService;
    constructor(questionOptionService: QuestionOptionService);
    create(input: CreateQuestionOptionInput): Promise<QuestionOption>;
    findAll(): Promise<QuestionOption[]>;
    findOne(id: number): Promise<QuestionOption>;
    update(updateQuestionOptionInput: UpdateQuestionOptionInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<QuestionOption>;
}

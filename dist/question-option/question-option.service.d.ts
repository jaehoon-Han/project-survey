import { Repository } from 'typeorm';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';
import { QuestionOption } from './entities/question-option.entity';
export declare class QuestionOptionService {
    private questionOptionRepository;
    constructor(questionOptionRepository: Repository<QuestionOption>);
    create(createQuestionOptionInput: CreateQuestionOptionInput): Promise<QuestionOption>;
    findAll(): Promise<QuestionOption[]>;
    findOne(id: number): Promise<QuestionOption>;
    update(id: number, updateQuestionOptionInput: UpdateQuestionOptionInput): string;
    remove(id: number): string;
}

import { QuestionOptionService } from 'src/question-option/question-option.service';
import { Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';
export declare class AnswerService {
    private answerRepository;
    private questionOptionService;
    constructor(answerRepository: Repository<Answer>, questionOptionService: QuestionOptionService);
    create(createAnswerInput: CreateAnswerInput): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    update(id: number, updateAnswerInput: UpdateAnswerInput): string;
    remove(id: number): string;
}

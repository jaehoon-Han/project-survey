import { Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
export declare class QuestionService {
    private questionRepository;
    constructor(questionRepository: Repository<Question>);
    create(createQuestionInput: CreateQuestionInput): Promise<Question>;
    findAll(): Promise<Question[]>;
    findOne(id: number): Promise<Question>;
    update(id: number, updateQuestionInput: UpdateQuestionInput): string;
    remove(id: number): string;
}

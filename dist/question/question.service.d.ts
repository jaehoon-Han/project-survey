import { Survey } from 'src/survey/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
export declare class QuestionService {
    private questionRepository;
    private entityManager;
    constructor(questionRepository: Repository<Question>, entityManager: EntityManager);
    create(input: CreateQuestionInput): Promise<Question>;
    findAll(): Promise<Question[]>;
    findOne(id: number): Promise<Question>;
    findDetail(id: number): Promise<Question[]>;
    findOneCategoryOfQuestion(id: number): Promise<Question[]>;
    findAllCategoryOfQuestion(surveyId: number): Promise<Question[]>;
    update(id: number, updateQuestionInput: UpdateQuestionInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Question>;
    duplicateQuestion(id: number): Promise<Question>;
    duplicateQuestionOption(id: number, copyQuestion: Question): Promise<void>;
    duplicateQuestionCategory(id: number, copyQuestion: Question): Promise<void>;
    validQuestion(id: number): Promise<Question>;
    validSurvey(surveyId: number): Promise<Survey>;
}

import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';
export declare class AnswerService {
    private answerRepository;
    private entityManager;
    constructor(answerRepository: Repository<Answer>, entityManager: EntityManager);
    private readonly logger;
    create(createAnswerInput: CreateAnswerInput, questionOptionId: number): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    update(id: number, updateAnswerInput: UpdateAnswerInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Answer>;
    findQuestion(questionId: number): Promise<Question>;
    findQuestionContent(questionId: number): Promise<string>;
    findQuestionOption(questionOptionId: number): Promise<QuestionOption>;
    checkComplete(surveyResponse: SurveyResponse, surveyResponseId: number): Promise<void>;
    validAnswer(id: number): Promise<Answer>;
    validSurveyResponse(surveyResponseId: number): Promise<SurveyResponse>;
    validQuestion(questionId: number): Promise<Question>;
    validQuestionOption(questionOptionId: number): Promise<QuestionOption>;
}

import { EntityManager, Repository } from 'typeorm';
import { CreateSurveyResponseInput } from './dto/create-survey-response.input';
import { UpdateSurveyResponseInput } from './dto/update-survey-response.input';
import { SurveyResponse } from './entities/survey-response.entity';
export declare class SurveyResponseService {
    private surveyResponseRepository;
    private entityManager;
    constructor(surveyResponseRepository: Repository<SurveyResponse>, entityManager: EntityManager);
    create(input: CreateSurveyResponseInput): Promise<SurveyResponse>;
    findAll(): Promise<SurveyResponse[]>;
    findOne(id: number): Promise<SurveyResponse>;
    findComplete(): Promise<SurveyResponse[]>;
    findDetail(id: number): Promise<SurveyResponse[]>;
    update(id: number, updateSurveyResponseInput: UpdateSurveyResponseInput): Promise<import("typeorm").UpdateResult>;
    updateScore(id: number): Promise<import("typeorm").UpdateResult>;
    countScore(id: number): Promise<number>;
    remove(id: number): Promise<SurveyResponse>;
    findTotalScoreOfCategorys(id: number): Promise<SurveyResponse[]>;
    validSurveyResponse(id: number): Promise<SurveyResponse>;
}

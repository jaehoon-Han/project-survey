import { EntityManager, Repository } from 'typeorm';
import { CreateSurveyResponseInput } from './dto/create-survey-response.input';
import { UpdateSurveyResponseInput } from './dto/update-survey-response.input';
import { SurveyResponse } from './entities/survey-response.entity';
export declare class SurveyResponseService {
    private surveyResponseRepository;
    private entityManager;
    constructor(surveyResponseRepository: Repository<SurveyResponse>, entityManager: EntityManager);
    create(createSurveyResponseInput: CreateSurveyResponseInput): Promise<SurveyResponse>;
    findAll(): Promise<SurveyResponse[]>;
    findOne(id: number): Promise<SurveyResponse>;
    findDetail(id: number): Promise<SurveyResponse[]>;
    update(id: number, updateSurveyResponseInput: UpdateSurveyResponseInput): string;
    remove(id: number): string;
}

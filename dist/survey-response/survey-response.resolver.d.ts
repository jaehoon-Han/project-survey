import { SurveyResponseService } from './survey-response.service';
import { SurveyResponse } from './entities/survey-response.entity';
import { CreateSurveyResponseInput } from './dto/create-survey-response.input';
import { UpdateSurveyResponseInput } from './dto/update-survey-response.input';
export declare class SurveyResponseResolver {
    private readonly surveyResponseService;
    constructor(surveyResponseService: SurveyResponseService);
    create(input: CreateSurveyResponseInput): Promise<SurveyResponse>;
    findAll(): Promise<SurveyResponse[]>;
    findOne(id: number): Promise<SurveyResponse>;
    findDetail(id: number): Promise<SurveyResponse[]>;
    findComplete(): Promise<SurveyResponse[]>;
    update(updateSurveyResponseInput: UpdateSurveyResponseInput): Promise<import("typeorm").UpdateResult>;
    updateCount(id: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<SurveyResponse>;
}

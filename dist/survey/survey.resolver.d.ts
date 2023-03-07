import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
export declare class SurveyResolver {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    createSurvey(createSurveyInput: CreateSurveyInput): Promise<Survey>;
    findAll(): Promise<Survey[]>;
    findOne(id: number): Promise<Survey>;
    findDetail(id: number): Promise<Survey[]>;
    updateSurvey(updateSurveyInput: UpdateSurveyInput): Promise<import("typeorm").UpdateResult>;
    removeSurvey(id: number): Promise<Survey>;
}

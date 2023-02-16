import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
export declare class SurveyResolver {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    createSurvey(createSurveyInput: CreateSurveyInput): Promise<Survey>;
    findAllSurvey(): Promise<Survey[]>;
    findOneSurvey(id: number): Promise<Survey>;
    findDetail(id: number): Promise<Survey[]>;
}

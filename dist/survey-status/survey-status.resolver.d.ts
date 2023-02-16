import { SurveyStatusService } from './survey-status.service';
import { SurveyStatus } from './entities/survey-status.entity';
import { CreateSurveyStatusInput } from './dto/create-survey-status.input';
import { UpdateSurveyStatusInput } from './dto/update-survey-status.input';
export declare class SurveyStatusResolver {
    private readonly surveyStatusService;
    constructor(surveyStatusService: SurveyStatusService);
    createSurveyStatus(createSurveyStatusInput: CreateSurveyStatusInput): Promise<SurveyStatus>;
    findAll(): Promise<SurveyStatus[]>;
    findOne(id: number): Promise<SurveyStatus>;
    updateSurveyStatus(updateSurveyStatusInput: UpdateSurveyStatusInput): string;
    removeSurveyStatus(id: number): string;
}

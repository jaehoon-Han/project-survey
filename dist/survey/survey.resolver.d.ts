import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
export declare class SurveyResolver {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    create(input: CreateSurveyInput): Promise<Survey>;
    findAll(): Promise<Survey[]>;
    findOne(id: number): Promise<Survey>;
    findQuestionAndOptionOfSurvey(id: number): Promise<Survey[]>;
    update(updateSurveyInput: UpdateSurveyInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Survey>;
}

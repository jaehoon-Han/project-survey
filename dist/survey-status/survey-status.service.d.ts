import { Repository } from 'typeorm';
import { CreateSurveyStatusInput } from './dto/create-survey-status.input';
import { UpdateSurveyStatusInput } from './dto/update-survey-status.input';
import { SurveyStatus } from './entities/survey-status.entity';
export declare class SurveyStatusService {
    private surveyStatusRepository;
    constructor(surveyStatusRepository: Repository<SurveyStatus>);
    create(createSurveyStatusInput: CreateSurveyStatusInput): Promise<SurveyStatus>;
    findAll(): Promise<SurveyStatus[]>;
    findOne(id: number): Promise<SurveyStatus>;
    update(id: number, updateSurveyStatusInput: UpdateSurveyStatusInput): string;
    remove(id: number): string;
}

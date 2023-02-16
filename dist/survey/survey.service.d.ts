import { Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { Survey } from './entities/survey.entity';
export declare class SurveyService {
    private surveyRepository;
    constructor(surveyRepository: Repository<Survey>);
    create(createSurveyInput: CreateSurveyInput): Promise<Survey>;
    findAll(): Promise<Survey[]>;
    findOne(id: number): Promise<Survey>;
    findDetail(id: number): Promise<Survey[]>;
}

import { Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';
export declare class SurveyService {
    private surveyRepository;
    constructor(surveyRepository: Repository<Survey>);
    create(createSurveyInput: CreateSurveyInput): Promise<Survey>;
    findAll(): Promise<Survey[]>;
    findOne(id: number): Promise<Survey>;
    findDetail(id: number): Promise<Survey[]>;
    update(id: number, updateSurveyInput: UpdateSurveyInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<void>;
}

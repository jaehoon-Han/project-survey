import { DataSource, Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';
export declare class SurveyService {
    private surveyRepository;
    private dataSource;
    constructor(surveyRepository: Repository<Survey>, dataSource: DataSource);
    private readonly logger;
    create(createSurveyInput: CreateSurveyInput): Promise<Survey>;
    findAll(): Promise<Survey[]>;
    findOne(id: number): Promise<Survey>;
    findDetail(id: number): Promise<Survey[]>;
    update(id: number, updateSurveyInput: UpdateSurveyInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Survey>;
}

import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';
export declare class SurveyService {
    private surveyRepository;
    private entityManager;
    private dataSource;
    constructor(surveyRepository: Repository<Survey>, entityManager: EntityManager, dataSource: DataSource);
    create(createSurveyInput: CreateSurveyInput): Promise<Survey>;
    findAll(): Promise<Survey[]>;
    findOne(id: number): Promise<Survey>;
    findDetail(id: number): Promise<Survey[]>;
    update(id: number, updateSurveyInput: UpdateSurveyInput): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeQuestion(id: number): Promise<void>;
}

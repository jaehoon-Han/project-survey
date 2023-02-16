import { Survey } from 'src/survey/entities/survey.entity';
export declare class SurveyStatus {
    id: number;
    surveyId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    survey: Survey;
}

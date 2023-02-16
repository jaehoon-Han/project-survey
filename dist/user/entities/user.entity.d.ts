import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
export declare class User {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    surveyResponse: SurveyResponse[];
}

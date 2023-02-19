import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
export declare class Answer {
    id: number;
    surveyResponseId: number;
    questionOptionId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    surveyResponse: SurveyResponse;
}

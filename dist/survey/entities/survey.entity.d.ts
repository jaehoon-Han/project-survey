import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { SurveyStatus } from 'src/survey-status/entities/survey-status.entity';
export declare class Survey {
    id: number;
    title: string;
    description: string;
    amountQuestion: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    question: Question[];
    surveyStatus: SurveyStatus[];
    surveyResponse: SurveyResponse[];
}

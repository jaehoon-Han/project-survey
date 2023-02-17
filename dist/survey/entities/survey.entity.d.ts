import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
export declare class Survey {
    id: number;
    title: string;
    description: string;
    amountQuestion: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    question: Question[];
    surveyResponse: SurveyResponse[];
}

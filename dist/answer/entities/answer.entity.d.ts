import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
export declare class Answer extends CommonEntity {
    question: string;
    questionOption: string;
    score: number;
    surveyResponseId: number;
    surveyResponse: SurveyResponse;
}

import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
export declare class Survey extends CommonEntity {
    title: string;
    description: string;
    amountQuestion: number;
    question: Question[];
    surveyResponse: SurveyResponse[];
}

import { CommonEntity } from 'src/common/commonentity.interface';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
export declare class Survey extends CommonEntity {
    title: string;
    description: string;
    question: Question[];
    surveyResponse: SurveyResponse[];
}

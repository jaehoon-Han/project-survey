import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
export declare class User extends CommonEntity {
    name: string;
    surveyResponse: SurveyResponse[];
}

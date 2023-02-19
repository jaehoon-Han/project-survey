import { CommonEntity } from 'src/common/commonentity.interface';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
export declare class User extends CommonEntity {
    name: string;
    deletedAt: Date;
    surveyResponse: SurveyResponse[];
}

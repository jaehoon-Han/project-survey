import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { ResponseCategory } from 'src/response-category/entities/response-category.entity';
export declare class SurveyResponse extends CommonEntity {
    totalScore: number;
    amountAnswer: number;
    amountQuestion: number;
    isComplete: boolean;
    surveyId: number;
    userId: number;
    survey: Survey;
    user: User;
    answer: Answer[];
    responseCategory: ResponseCategory[];
}

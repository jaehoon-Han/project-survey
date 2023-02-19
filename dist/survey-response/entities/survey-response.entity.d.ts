import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';
export declare class SurveyResponse {
    id: number;
    totalScore: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    survey: Survey;
    user: User;
    answer: Answer[];
}

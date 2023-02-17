import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Survey } from 'src/survey/entities/survey.entity';
export declare class Question {
    id: number;
    surveyId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    survey: Survey;
    questionOption: QuestionOption[];
}

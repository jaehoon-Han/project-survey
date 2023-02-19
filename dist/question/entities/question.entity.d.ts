import { CommonEntity } from 'src/common/commonentity.interface';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Survey } from 'src/survey/entities/survey.entity';
export declare class Question extends CommonEntity {
    content: string;
    survey: Survey;
    surveyId: number;
    questionOption: QuestionOption[];
}

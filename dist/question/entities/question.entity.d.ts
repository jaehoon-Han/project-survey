import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { QuestionCategory } from 'src/question-category/entities/question-category.entity';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Survey } from 'src/survey/entities/survey.entity';
export declare class Question extends CommonEntity {
    content: string;
    surveyId: number;
    survey: Survey;
    questionOption: QuestionOption[];
    questionCategory: QuestionCategory[];
}

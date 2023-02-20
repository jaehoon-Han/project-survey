import { CommonEntity } from 'src/common/commonentity.interface';
import { Question } from 'src/question/entities/question.entity';
export declare class QuestionOption extends CommonEntity {
    questionId: number;
    content: string;
    score: number;
    deletedAt: Date;
    question: Question;
}

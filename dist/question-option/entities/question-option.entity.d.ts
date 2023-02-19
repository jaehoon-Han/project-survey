import { Question } from 'src/question/entities/question.entity';
export declare class QuestionOption {
    id: number;
    questionId: number;
    content: string;
    score: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    question: Question;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Answer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  surveyResponseId: number;

  @Field(() => Int)
  @Column()
  questionOptionId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => SurveyResponse)
  @ManyToOne(() => SurveyResponse, (surveyResponse) => surveyResponse.answer)
  surveyResponse: SurveyResponse;

  @Field(() => QuestionOption)
  @ManyToOne(() => QuestionOption, (questionOption) => questionOption.answer)
  questionOption: QuestionOption;
}

import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { SurveyStatus } from 'src/survey-status/entities/survey-status.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@InputType('SurveyInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Survey {
  @Field(() => Int, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'title list의 id ' })
  @Column()
  title: string;

  @Field(() => String, { description: 'description' })
  @Column()
  description: string;

  @Field(() => Int, { description: 'question amount' })
  @Column()
  amountQuestion: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.survey, { eager: true })
  question: Question[];

  @Field(() => [SurveyStatus], { nullable: true })
  @OneToMany(() => SurveyStatus, (surveyStatus) => surveyStatus.survey, {
    eager: true,
  })
  surveyStatus: SurveyStatus[];

  @Field(() => [SurveyResponse], { nullable: true })
  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.survey, {
    eager: true,
  })
  surveyResponse: SurveyResponse[];
  // one to many > survey_status, survey_response 둘다 필요
}

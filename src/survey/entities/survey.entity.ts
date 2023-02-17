import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/commonentity.interface';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
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
export class Survey extends CommonEntity {
  @Field(() => String, { description: 'survey title' })
  @Column()
  title: string;

  @Field(() => String, { description: 'survey description' })
  @Column()
  description: string;

  @Field(() => Int, { description: 'question amount' })
  @Column()
  amountQuestion: number;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.survey, { eager: true })
  question: Question[];

  @Field(() => [SurveyResponse], { nullable: true })
  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.survey, {
    eager: true,
  })
  surveyResponse: SurveyResponse[];
}

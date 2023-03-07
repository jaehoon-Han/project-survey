import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Min, MinLength } from 'class-validator';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@InputType('SurveyInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Survey extends CommonEntity {
  @Field(() => String, { description: 'survey title' })
  @Column()
  @MinLength(2, { message: 'Title is too short!' })
  title: string;

  @Field(() => String, { description: 'survey description' })
  @Column()
  description: string;

  @Field(() => Int, { description: 'question amount' })
  @Column()
  @Min(0, { message: 'Survey must have questions at least 1! ' })
  amountQuestion: number;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
  })
  @Field(() => [Question], { nullable: true })
  question: Question[];

  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.survey)
  @Field(() => [SurveyResponse], { nullable: true })
  surveyResponse: SurveyResponse[];
}

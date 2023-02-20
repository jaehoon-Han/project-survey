import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CommonEntity } from 'src/common/commonentity.interface';
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

  @OneToMany(() => Question, (question) => question.survey, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Question], { nullable: true })
  question: Question[];

  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.survey)
  @Field(() => [SurveyResponse], { nullable: true })
  surveyResponse: SurveyResponse[];
}

import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
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
  title: string;

  @Field(() => String, { description: 'survey description' })
  @Column()
  description: string;

  @Field(() => Int, { description: 'question amount' })
  @Column()
  amountQuestion: number;

  @OneToMany(() => Question, (question) => question.survey, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Question])
  question: Question[];

  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.survey)
  @Field(() => [SurveyResponse])
  surveyResponse: SurveyResponse[];
}

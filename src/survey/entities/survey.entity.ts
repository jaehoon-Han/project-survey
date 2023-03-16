import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Min, MinLength } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@InputType('SurveyInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Survey extends CommonEntity {
  @Field(() => String)
  @Column()
  @MinLength(2, { message: 'Title is too short!' })
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  @Min(0)
  amountQuestion: number;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
  })
  @Field(() => [Question], { nullable: true })
  question: Question[];

  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.survey, {
    cascade: true,
  })
  @Field(() => [SurveyResponse], { nullable: true })
  surveyResponse: SurveyResponse[];

  @OneToMany(() => Category, (category) => category.survey, { cascade: true })
  @Field(() => [Category], { nullable: true })
  category: Category[];
}

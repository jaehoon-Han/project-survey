import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/commonentity.interface';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Answer extends CommonEntity {
  @Field(() => String)
  @Column()
  question: string;

  @Field(() => String)
  @Column()
  questionOption: string;

  @Field(() => Int)
  @Column()
  score: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => Int)
  @Column()
  surveyResponseId: number;

  @Field(() => SurveyResponse)
  @ManyToOne(() => SurveyResponse, (surveyResponse) => surveyResponse.answer)
  surveyResponse: SurveyResponse;
}

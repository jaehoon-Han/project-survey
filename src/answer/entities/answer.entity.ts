import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/commonentity.interface';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Answer extends CommonEntity {
  @Field(() => String)
  @Column()
  @IsString()
  question: string;

  @Field(() => String)
  @Column()
  @IsString()
  questionOption: string;

  @Field(() => Int)
  @Column()
  @IsNumber()
  score: number;

  @Field(() => Int)
  @Column()
  @IsNumber()
  surveyResponseId: number;

  @Field(() => SurveyResponse)
  @ManyToOne(() => SurveyResponse, (surveyResponse) => surveyResponse.answer, {
    onDelete: 'CASCADE',
  })
  surveyResponse: SurveyResponse;
}

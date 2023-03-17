import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class ResponseCategory extends CommonEntity {
  // @Field(() => Int)
  @Column()
  surveyResponseId: number;

  @Field(() => String)
  @Column({ default: 'undefined' })
  @IsString()
  categoryName: string;

  @Field(() => Int)
  @Column({ default: 0 })
  @IsNumber()
  totalScore: number;

  @Field(() => String)
  @Column({ default: 'undefined' })
  @IsString()
  message: string;

  @Field(() => SurveyResponse)
  @JoinColumn({ name: 'surveyResponseId' })
  @ManyToOne(
    () => SurveyResponse,
    (surveyResponse) => surveyResponse.responseCategory,
    {
      onDelete: 'CASCADE',
    },
  )
  surveyResponse: SurveyResponse;
}

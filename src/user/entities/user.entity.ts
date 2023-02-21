import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CommonEntity } from 'src/common/commonentity.interface';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User extends CommonEntity {
  @Field(() => String)
  @Column()
  @IsString()
  @Length(2, 10)
  name: string;

  @Field(() => [SurveyResponse])
  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.user, {
    cascade: true,
  })
  surveyResponse: SurveyResponse[];
}

import { ObjectType, Field } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/commonentity.interface';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User extends CommonEntity {
  @Field(() => String)
  @Column()
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => [SurveyResponse])
  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.user)
  surveyResponse: SurveyResponse[];
}

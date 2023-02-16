import { ObjectType, Field, Int } from '@nestjs/graphql';
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

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => [SurveyResponse])
  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.user, {
    eager: true,
  })
  surveyResponse: SurveyResponse[];
}

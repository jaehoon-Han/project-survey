import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';

@ObjectType()
@Entity()
export class SurveyResponse {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  surveyId: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => Int)
  @Column()
  totalScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.surveyResponse)
  survey: Survey;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.surveyResponse)
  user: User;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.surveyResponse, { eager: true })
  answer: Answer[];

  //todo: user와 manytoone 연결해주기
}

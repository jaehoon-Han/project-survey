import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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
  totalScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Survey, (survey) => survey.surveyResponse)
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @ManyToOne(() => User, (user) => user.surveyResponse)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.surveyResponse)
  answer: Answer[];

  //todo: user와 manytoone 연결해주기
}

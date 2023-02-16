import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';
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

@ObjectType()
@Entity()
export class QuestionOption {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  questionId: number;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => Int)
  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.questionOption)
  question: Question;

  @Field(() => Answer)
  @OneToMany(() => Answer, (answer) => answer.questionOption, { eager: true })
  answer: Answer[];

  // todo: 너도 question 이랑 manytoone 해주기
}

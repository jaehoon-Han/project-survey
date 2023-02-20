import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/commonentity.interface';
import { Question } from 'src/question/entities/question.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity()
export class QuestionOption extends CommonEntity {
  @Field(() => Int)
  @Column()
  questionId: number;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => Int)
  @Column()
  score: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.questionOption, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question: Question;
}

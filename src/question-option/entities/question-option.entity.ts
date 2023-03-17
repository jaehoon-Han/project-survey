import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class QuestionOption extends CommonEntity {
  @Column()
  questionId: number;

  @Field(() => String)
  @Column()
  @IsString()
  @MinLength(1, { message: 'Content is too short!' })
  content: string;

  @Field(() => Int)
  @Column()
  @IsNumber()
  score: number;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.questionOption, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question: Question;
}

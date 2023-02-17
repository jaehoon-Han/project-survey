import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Survey } from 'src/survey/entities/survey.entity';
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
export class Question {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  surveyId: number;

  @Field(() => String)
  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.question)
  survey: Survey;

  @Field(() => [QuestionOption])
  @OneToMany(
    () => QuestionOption,
    (questionOption) => questionOption.question,
    { eager: true },
  )
  questionOption: QuestionOption[];

  // @OneToMany(() => Answer, (answer) => answer.question)
  // answer: Answer[];
}

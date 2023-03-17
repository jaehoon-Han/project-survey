import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNumber, MinLength } from 'class-validator';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { QuestionCategory } from 'src/question-category/entities/question-category.entity';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Question extends CommonEntity {
  @Field(() => String)
  @Column()
  @MinLength(1, { message: 'Content is too short!' })
  content: string;

  @Column()
  surveyId: number;

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @Field(() => [QuestionOption])
  @OneToMany(
    () => QuestionOption,
    (questionOption) => questionOption.question,
    { cascade: true },
  )
  questionOption: QuestionOption[];

  @Field(() => [QuestionCategory])
  @OneToMany(
    () => QuestionCategory,
    (questionCategory) => questionCategory.question,
    { cascade: true },
  )
  questionCategory: QuestionCategory[];
}

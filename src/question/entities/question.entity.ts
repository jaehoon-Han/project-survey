import { ObjectType, Field } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/commonentity.interface';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Question extends CommonEntity {
  @Field(() => String)
  @Column()
  content: string;

  @ManyToOne(() => Survey, (survey) => survey.question, { onDelete: 'CASCADE' })
  @Field(() => Survey)
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @Column()
  surveyId: number;

  @Field(() => [QuestionOption])
  @OneToMany(
    () => QuestionOption,
    (questionOption) => questionOption.question,
    { cascade: true },
  )
  questionOption: QuestionOption[];
}

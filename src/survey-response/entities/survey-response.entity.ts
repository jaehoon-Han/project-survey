import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { ResponseCategory } from 'src/response-category/entities/response-category.entity';

@ObjectType()
@Entity()
export class SurveyResponse extends CommonEntity {
  @Field(() => Int)
  @Column({ default: 0 })
  totalScore: number;

  @Field(() => Int)
  @Column({ default: 0 })
  amountAnswer: number;

  @Field(() => Int)
  @Column()
  amountQuestion: number;

  @Field(() => Boolean)
  @Column({ default: false })
  isComplete: boolean;

  @Column()
  surveyId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Survey, (survey) => survey.surveyResponse, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'surveyId' })
  @Field(() => Survey)
  survey: Survey;

  @ManyToOne(() => User, (user) => user.surveyResponse, { onDelete: 'CASCADE' })
  @Field(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Answer, (answer) => answer.surveyResponse, { cascade: true })
  @Field(() => [Answer])
  answer: Answer[];

  @OneToMany(
    () => ResponseCategory,
    (responseCategory) => responseCategory.surveyResponse,
    { cascade: true },
  )
  @Field(() => [ResponseCategory])
  responseCategory: ResponseCategory[];
}

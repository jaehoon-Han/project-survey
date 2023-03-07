import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { CommonEntity } from 'src/common/entities/commonentity.interface';

@ObjectType()
@Entity()
export class SurveyResponse extends CommonEntity {
  @Field(() => Int)
  @Column({ default: 0 })
  totalScore: number;

  @Column({ default: 0 })
  @Field(() => Int)
  amountAnswer: number;

  @Column()
  @Field(() => Int)
  amountQuestion: number;

  @ManyToOne(() => Survey, (survey) => survey.surveyResponse, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @ManyToOne(() => User, (user) => user.surveyResponse, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.surveyResponse, { cascade: true })
  answer: Answer[];

  /**
   * @description 설문 완료 여부
   */
  @Field(() => Boolean)
  @Column({ default: false })
  isComplete: boolean;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { CommonEntity } from 'src/common/commonentity.interface';

@ObjectType()
@Entity()
export class SurveyResponse extends CommonEntity {
  @Field(() => Int)
  @Column({ default: 0 })
  totalScore: number;

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
}

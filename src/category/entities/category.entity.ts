import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CategoryScore } from 'src/category-score/entities/category-score.entity';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { QuestionCategory } from 'src/question-category/entities/question-category.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Category extends CommonEntity {
  @Field(() => String)
  @Column()
  @IsString()
  categoryName: string;

  @Column()
  surveyId: number;

  @OneToMany(() => CategoryScore, (categoryScore) => categoryScore.category, {
    cascade: true,
  })
  @Field(() => [CategoryScore], { nullable: true })
  categoryScore: CategoryScore[];

  @OneToMany(
    () => QuestionCategory,
    (questionCategory) => questionCategory.category,
    { cascade: true },
  )
  @Field(() => [QuestionCategory], { nullable: true })
  questionCategory: QuestionCategory[];

  @ManyToOne(() => Survey, (survey) => survey.category, {
    onDelete: 'CASCADE',
  })
  @Field(() => Survey)
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;
}

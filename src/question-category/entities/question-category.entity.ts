import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { CommonEntity } from 'src/common/entities/commonentity.interface';
import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class QuestionCategory extends CommonEntity {
  @Column()
  categoryId: number;

  @Column()
  questionId: number;

  @Field(() => String)
  @Column()
  @IsString()
  categoryName: string;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.questionCategory)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.questionCategory)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}

import { CreateQuestionCategoryInput } from './create-question-category.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionCategoryInput extends PartialType(
  CreateQuestionCategoryInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  questionId: number;
}

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateQuestionCategoryInput {
  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  questionId: number;
}

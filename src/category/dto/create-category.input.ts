import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  categoryName: string;

  @Field(() => Int)
  surveyId: number;
}

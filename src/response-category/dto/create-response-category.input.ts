import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateResponseCategoryInput {
  @Field(() => Int)
  surveyResponseId: number;

  @Field(() => Int)
  surveyId: number;
}

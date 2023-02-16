import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field(() => Int)
  surveyId: number;

  @Field(() => String)
  content: string;
}

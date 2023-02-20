import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => Int)
  surveyResponseId: number;

  @Field(() => Int)
  questionOptionId: number;

  @Field(() => String)
  question: string;

  @Field(() => String)
  questionOption: string;

  @Field(() => Int)
  score: number;
}

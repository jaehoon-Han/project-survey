import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionOptionInput {
  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  score: number;

  @Field(() => String)
  content: string;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSurveyResponseInput {
  @Field(() => Int)
  surveyId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  totalScore: number;
}

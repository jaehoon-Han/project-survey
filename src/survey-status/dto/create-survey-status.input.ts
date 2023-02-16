import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSurveyStatusInput {
  @Field(() => String)
  status: string;

  @Field(() => Int)
  surveyId: number;
}

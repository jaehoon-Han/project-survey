import { CreateSurveyStatusInput } from './create-survey-status.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSurveyStatusInput extends PartialType(CreateSurveyStatusInput) {
  @Field(() => Int)
  id: number;
}

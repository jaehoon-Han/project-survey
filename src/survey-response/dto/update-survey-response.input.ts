import { CreateSurveyResponseInput } from './create-survey-response.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSurveyResponseInput extends PartialType(CreateSurveyResponseInput) {
  @Field(() => Int)
  id: number;
}

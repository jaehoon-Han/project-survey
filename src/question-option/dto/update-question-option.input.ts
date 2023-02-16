import { CreateQuestionOptionInput } from './create-question-option.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionOptionInput extends PartialType(CreateQuestionOptionInput) {
  @Field(() => Int)
  id: number;
}

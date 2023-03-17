import { CreateCategoryScoreInput } from './create-category-score.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryScoreInput extends PartialType(
  CreateCategoryScoreInput,
) {
  @Field()
  id: number;
}

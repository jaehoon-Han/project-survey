import { CreateResponseCategoryInput } from './create-response-category.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateResponseCategoryInput extends PartialType(
  CreateResponseCategoryInput,
) {
  @Field(() => Int)
  id: number;
}

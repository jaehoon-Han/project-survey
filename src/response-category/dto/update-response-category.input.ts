import { CreateResponseCategoryInput } from './create-response-category.input';
import { PartialType } from '@nestjs/mapped-types';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateResponseCategoryInput extends PartialType(
  CreateResponseCategoryInput,
) {}

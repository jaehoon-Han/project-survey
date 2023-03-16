import { CreateCategoryInput } from './create-category.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field()
  @IsNumber()
  id: number;
}

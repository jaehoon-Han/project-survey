import { CreateCategoryScoreInput } from './create-category-score.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCategoryScoreInput extends PartialType(
  CreateCategoryScoreInput,
) {
  id: number;
}

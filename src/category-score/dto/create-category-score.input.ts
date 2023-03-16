import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryScoreInput {
  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  minScore: number;

  @Field(() => Int)
  maxScore: number;

  @Field(() => String)
  message: string;
}

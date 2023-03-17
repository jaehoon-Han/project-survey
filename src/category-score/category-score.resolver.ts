import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryScoreService } from './category-score.service';
import { CreateCategoryScoreInput } from './dto/create-category-score.input';
import { UpdateCategoryScoreInput } from './dto/update-category-score.input';
import { CategoryScore } from './entities/category-score.entity';

@Resolver('CategoryScore')
export class CategoryScoreResolver {
  constructor(private readonly categoryScoreService: CategoryScoreService) {}

  @Mutation(() => CategoryScore, { name: 'createCategoryScore' })
  create(
    @Args('input')
    input: CreateCategoryScoreInput,
  ) {
    return this.categoryScoreService.create(input);
  }

  @Query(() => [CategoryScore], { name: 'findAllCategoryScore' })
  findAll() {
    return this.categoryScoreService.findAll();
  }

  @Query(() => CategoryScore, { name: 'findOneCategoryScore' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryScoreService.findOne(id);
  }

  @Mutation(() => CategoryScore, { name: 'updateCategoryScore' })
  update(
    @Args('input')
    input: UpdateCategoryScoreInput,
  ) {
    return this.categoryScoreService.update(input);
  }

  @Mutation(() => CategoryScore, { name: 'removeCategoryScore' })
  remove(@Args('id') id: number) {
    return this.categoryScoreService.remove(id);
  }
}

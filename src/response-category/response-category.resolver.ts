import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateResponseCategoryInput } from './dto/create-response-category.input';
import { ResponseCategory } from './entities/response-category.entity';
import { ResponseCategoryService } from './response-category.service';

@Resolver('ResponseCategory')
export class ResponseCategoryResolver {
  constructor(
    private readonly responseCategoryService: ResponseCategoryService,
  ) {}

  @Mutation(() => ResponseCategory, { name: 'createResponseCategory' })
  create(
    @Args('input')
    input: CreateResponseCategoryInput,
  ) {
    return this.responseCategoryService.create(input);
  }

  @Query(() => [ResponseCategory], { name: 'findAllResponseCategory' })
  findAll() {
    return this.responseCategoryService.findAll();
  }

  @Query(() => ResponseCategory, { name: 'findOneResponseCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.responseCategoryService.findOne(id);
  }

  @Query(() => ResponseCategory, { name: 'findCategoryScoreWithCategory' })
  findCategoryScoreWithCategory(
    @Args('categoryId', { type: () => Int }) id: number,
  ) {
    return this.responseCategoryService.findCategoryScore(id);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, { name: 'createCategory' })
  create(@Args('createCategoryInput') input: CreateCategoryInput) {
    return this.categoryService.create(input);
  }

  @Query(() => [Category], { name: 'findAllCategory' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'findOneCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Query(() => Category, { name: 'findScoreOfCategory' })
  findScoreOfCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findCategoryScoreOfCategory(id);
  }

  @Query(() => [Category], { name: 'findQuestionOfCategory' })
  findCategoryofSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findQuestionOfCategory(id);
  }

  @Query(() => [Category], { name: 'findCategoryOfSurvey' })
  findCategoryOfSurvey(@Args('surveyId', { type: () => Int }) id: number) {
    return this.categoryService.findCategoryOfSurvey(id);
  }

  @Mutation(() => Category, { name: 'updateCategory' })
  update(@Args('input') input: UpdateCategoryInput) {
    return this.categoryService.update(input);
  }

  @Mutation(() => Category, { name: 'removeCategory' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}

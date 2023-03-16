import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionCategoryService } from './question-category.service';
import { CreateQuestionCategoryInput } from './dto/create-question-category.input';
import { UpdateQuestionCategoryInput } from './dto/update-question-category.input';
import { QuestionCategory } from './entities/question-category.entity';

@Resolver(() => QuestionCategory)
export class QuestionCategoryResolver {
  constructor(
    private readonly questionCategoryService: QuestionCategoryService,
  ) {}

  @Mutation(() => QuestionCategory, { name: 'createQuestionCategory' })
  create(@Args('input') input: CreateQuestionCategoryInput) {
    return this.questionCategoryService.create(input);
  }

  @Query(() => [QuestionCategory], { name: 'findAllQuestionCategory' })
  findAll() {
    return this.questionCategoryService.findAll();
  }

  @Query(() => QuestionCategory, { name: 'findOneQuestionCategory' })
  findOne(@Args('id') id: number) {
    return this.questionCategoryService.findOne(id);
  }

  @Mutation(() => QuestionCategory, { name: 'updateQuestioncategory' })
  update(
    @Args('input')
    input: UpdateQuestionCategoryInput,
  ) {
    return this.questionCategoryService.update(input);
  }

  @Mutation(() => QuestionCategory, { name: 'removeQuestionCategory' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.questionCategoryService.remove(id);
  }
}

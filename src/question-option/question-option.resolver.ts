import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionOptionService } from './question-option.service';
import { QuestionOption } from './entities/question-option.entity';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';

@Resolver(() => QuestionOption)
export class QuestionOptionResolver {
  constructor(private readonly questionOptionService: QuestionOptionService) {}

  @Mutation(() => QuestionOption, { name: 'createQuestionOption' })
  create(
    @Args('createQuestionOptionInput')
    input: CreateQuestionOptionInput,
  ) {
    return this.questionOptionService.create(input);
  }

  @Query(() => [QuestionOption], { name: 'findAllQuestionOption' })
  findAll() {
    return this.questionOptionService.findAll();
  }

  @Query(() => QuestionOption, { name: 'findOneQuestionOption' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionOptionService.findOne(id);
  }

  @Mutation(() => QuestionOption, { name: 'updateQuestionOption' })
  update(
    @Args('updateQuestionOptionInput')
    updateQuestionOptionInput: UpdateQuestionOptionInput,
  ) {
    return this.questionOptionService.update(
      updateQuestionOptionInput.id,
      updateQuestionOptionInput,
    );
  }

  @Mutation(() => QuestionOption, { name: 'removeQuestionOption' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.questionOptionService.remove(id);
  }
}

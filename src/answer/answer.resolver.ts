import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Category } from 'src/category/entities/category.entity';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => Answer, { name: 'createAnswer' })
  create(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
    @Args('questionOptionId') questionOptionid: number,
  ) {
    return this.answerService.create(createAnswerInput, questionOptionid);
  }

  @Query(() => [Answer], { name: 'findAllAnswer' })
  findAll() {
    return this.answerService.findAll();
  }

  @Query(() => Answer, { name: 'findOneAnswer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.answerService.findOne(id);
  }

  @Query(() => [Category], { name: 'testFindQuestionCategory' })
  findOneTest(@Args('id', { type: () => Int }) id: number) {
    return this.answerService.findQuestionCategory(id);
  }

  @Mutation(() => Answer, { name: 'updateAnswer' })
  update(@Args('updateAnswerInput') input: UpdateAnswerInput) {
    return this.answerService.update(input);
  }

  @Mutation(() => Answer, { name: 'removeAnswer' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.answerService.remove(id);
  }
}

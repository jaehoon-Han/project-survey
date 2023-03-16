import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question, { name: 'createQuestion' })
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionService.create(createQuestionInput);
  }

  @Query(() => [Question], { name: 'findAllQuestion' })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: 'findOneQuestion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findOne(id);
  }

  @Query(() => [Question], { name: 'findDetail' })
  findDetail(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findDetail(id);
  }

  @Query(() => [Question], { name: 'findOneCategoryOfQuestion' })
  findOneCategoryOfQuestion(
    @Args('questionId', { type: () => Int }) id: number,
  ) {
    return this.questionService.findOneCategoryOfQuestion(id);
  }

  // 전체 조회 테스트
  @Query(() => [Question], { name: 'findAllCategoryOfQuestion' })
  findAllCategoryOfQuestion(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ) {
    return this.questionService.findAllCategoryOfQuestion(surveyId);
  }

  @Mutation(() => Question, { name: 'updateQuestion' })
  update(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionService.update(
      updateQuestionInput.id,
      updateQuestionInput,
    );
  }

  @Mutation(() => Question, { name: 'removeQuestion' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.remove(id);
  }

  @Mutation(() => Question, { name: 'duplicateQuestion' })
  replicateQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.duplicateQuestion(id);
  }
}

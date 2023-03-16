import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveyResponseService } from './survey-response.service';
import { SurveyResponse } from './entities/survey-response.entity';
import { CreateSurveyResponseInput } from './dto/create-survey-response.input';
import { UpdateSurveyResponseInput } from './dto/update-survey-response.input';

@Resolver(() => SurveyResponse)
export class SurveyResponseResolver {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  @Mutation(() => SurveyResponse, { name: 'createSurveyResponse' })
  create(
    @Args('input')
    input: CreateSurveyResponseInput,
  ) {
    return this.surveyResponseService.create(input);
  }

  @Query(() => [SurveyResponse], { name: 'findAllSurveyResponse' })
  findAll() {
    return this.surveyResponseService.findAll();
  }

  @Query(() => SurveyResponse, { name: 'findSurveyResponse' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.surveyResponseService.findOne(id);
  }

  @Query(() => [SurveyResponse], { name: 'findDetail' })
  findDetail(@Args('id', { type: () => Int }) id: number) {
    return this.surveyResponseService.findDetail(id);
  }

  @Query(() => [SurveyResponse], { name: 'findComplete' })
  findComplete() {
    return this.surveyResponseService.findComplete();
  }

  @Mutation(() => SurveyResponse, { name: 'updateSurveyResponse' })
  update(
    @Args('updateSurveyResponseInput')
    updateSurveyResponseInput: UpdateSurveyResponseInput,
  ) {
    return this.surveyResponseService.update(
      updateSurveyResponseInput.id,
      updateSurveyResponseInput,
    );
  }

  @Mutation(() => SurveyResponse, { name: 'updateCount' })
  updateCount(@Args('id', { type: () => Int }) id: number) {
    return this.surveyResponseService.updateScore(id);
  }

  @Mutation(() => SurveyResponse, { name: 'removeSurveyResponse' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.surveyResponseService.remove(id);
  }
}

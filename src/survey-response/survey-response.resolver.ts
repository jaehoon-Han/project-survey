import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveyResponseService } from './survey-response.service';
import { SurveyResponse } from './entities/survey-response.entity';
import { CreateSurveyResponseInput } from './dto/create-survey-response.input';
import { UpdateSurveyResponseInput } from './dto/update-survey-response.input';

@Resolver(() => SurveyResponse)
export class SurveyResponseResolver {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  @Mutation(() => SurveyResponse)
  createSurveyResponse(
    @Args('createSurveyResponseInput')
    createSurveyResponseInput: CreateSurveyResponseInput,
  ) {
    return this.surveyResponseService.create(createSurveyResponseInput);
  }

  @Query(() => [SurveyResponse], { name: 'surveyResponse' })
  findAll() {
    return this.surveyResponseService.findAll();
  }

  @Query(() => SurveyResponse, { name: 'surveyResponse' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.surveyResponseService.findOne(id);
  }

  @Query(() => [SurveyResponse])
  findDetail(@Args('id', { type: () => Int }) id: number) {
    return this.surveyResponseService.findDetail(id);
  }

  @Mutation(() => SurveyResponse)
  updateSurveyResponse(
    @Args('updateSurveyResponseInput')
    updateSurveyResponseInput: UpdateSurveyResponseInput,
  ) {
    return this.surveyResponseService.update(
      updateSurveyResponseInput.id,
      updateSurveyResponseInput,
    );
  }

  @Mutation(() => SurveyResponse)
  removeSurveyResponse(@Args('id', { type: () => Int }) id: number) {
    return this.surveyResponseService.remove(id);
  }
}

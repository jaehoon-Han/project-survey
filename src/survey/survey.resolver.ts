import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Mutation(() => Survey, { name: 'createSurvey' })
  create(@Args('input') input: CreateSurveyInput) {
    return this.surveyService.create(input);
  }

  @Query(() => [Survey], { name: 'findAllSurvey' })
  async findAll() {
    const survey = this.surveyService.findAll();
    return survey;
  }

  @Query(() => Survey, { name: 'findOneSurvey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.findOne(id);
  }

  @Query(() => [Survey], { name: 'findDetailSurvey' })
  findQuestionAndOptionOfSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.findQuestionAndOptionOfSurvey(id);
  }

  @Mutation(() => Survey, { name: 'updateSurvey' })
  update(@Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput) {
    return this.surveyService.update(updateSurveyInput.id, updateSurveyInput);
  }

  @Mutation(() => Survey, { name: 'removeSurvey' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.remove(id);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveyStatusService } from './survey-status.service';
import { SurveyStatus } from './entities/survey-status.entity';
import { CreateSurveyStatusInput } from './dto/create-survey-status.input';
import { UpdateSurveyStatusInput } from './dto/update-survey-status.input';

@Resolver(() => SurveyStatus)
export class SurveyStatusResolver {
  constructor(private readonly surveyStatusService: SurveyStatusService) {}

  @Mutation(() => SurveyStatus)
  createSurveyStatus(
    @Args('createSurveyStatusInput')
    createSurveyStatusInput: CreateSurveyStatusInput,
  ) {
    return this.surveyStatusService.create(createSurveyStatusInput);
  }

  @Query(() => [SurveyStatus], { name: 'surveyStatus' })
  findAll() {
    return this.surveyStatusService.findAll();
  }

  @Query(() => SurveyStatus, { name: 'surveyStatus' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.surveyStatusService.findOne(id);
  }

  @Mutation(() => SurveyStatus)
  updateSurveyStatus(
    @Args('updateSurveyStatusInput')
    updateSurveyStatusInput: UpdateSurveyStatusInput,
  ) {
    return this.surveyStatusService.update(
      updateSurveyStatusInput.id,
      updateSurveyStatusInput,
    );
  }

  @Mutation(() => SurveyStatus)
  removeSurveyStatus(@Args('id', { type: () => Int }) id: number) {
    return this.surveyStatusService.remove(id);
  }
}

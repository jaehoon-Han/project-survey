import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateSurveyResponseInput } from './dto/create-survey-response.input';
import { UpdateSurveyResponseInput } from './dto/update-survey-response.input';
import { SurveyResponse } from './entities/survey-response.entity';

@Injectable()
export class SurveyResponseService {
  constructor(
    @InjectRepository(SurveyResponse)
    private surveyResponseRepository: Repository<SurveyResponse>,
    private entityManager: EntityManager,
  ) {}

  private readonly logger = new Logger(SurveyResponseService.name);
  async create(
    createSurveyResponseInput: CreateSurveyResponseInput,
  ): Promise<SurveyResponse> {
    const newSurveyResponse = this.surveyResponseRepository.create(
      createSurveyResponseInput,
    );

    const user = new User();
    user.id = createSurveyResponseInput.userId;

    newSurveyResponse.user = user;
    newSurveyResponse.survey = await this.entityManager.findOneBy(Survey, {
      id: createSurveyResponseInput.surveyId,
    });
    newSurveyResponse.amountQuestion = newSurveyResponse.survey.amountQuestion;

    return await this.surveyResponseRepository.save(newSurveyResponse);
  }

  async findAll(): Promise<SurveyResponse[]> {
    const surveyResponse = await this.surveyResponseRepository.find();
    return surveyResponse;
  }

  async findOne(id: number): Promise<SurveyResponse> {
    return this.validSurveyResponse(id);
  }

  /**
   * @description "선택한 답변의 응답 조회"
   * @param id
   * @returns
   */
  async findDetail(id: number) {
    const result = await this.surveyResponseRepository
      .createQueryBuilder('surveyResponse')
      .leftJoinAndSelect('surveyResponse.answer', 'answer')
      .where('surveyResponse.id= :id', { id: id })
      .getMany();

    return result;
  }

  async update(
    id: number,
    updateSurveyResponseInput: UpdateSurveyResponseInput,
  ) {
    const surveyResponse = await this.findOne(id);
    this.surveyResponseRepository.merge(
      surveyResponse,
      updateSurveyResponseInput,
    );
    return this.surveyResponseRepository.update(id, surveyResponse);
  }

  async updateScore(id: number) {
    const surveyResponse = await this.findOne(id);

    this.logger.debug('call totalScore');
    surveyResponse.totalScore = await this.countScore(id);
    this.logger.debug(surveyResponse.totalScore);
    return this.surveyResponseRepository.update(id, surveyResponse);
  }

  async countScore(id: number): Promise<number> {
    const count: {
      sum: number;
    } = await this.surveyResponseRepository
      .createQueryBuilder('surveyResponse')
      .leftJoinAndSelect('surveyResponse.answer', 'answer')
      .select('sum(answer.score)', 'sum')
      .where('answer.surveyResponseId= :id', { id: id })
      .groupBy('surveyResponse.userId')
      .getRawOne();

    this.logger.debug(count);
    return count.sum;
  }

  async remove(id: number) {
    const surveyResponse = await this.findOne(id);
    return this.entityManager.remove(surveyResponse);
  }

  async validSurveyResponse(id: number) {
    const surveyResponse = await this.surveyResponseRepository.findOneBy({
      id,
    });
    if (!surveyResponse) {
      throw new Error(`CAN NOT FIND SURVEY RESPONSE! ID: ${id}`);
    }
    return surveyResponse;
  }
}

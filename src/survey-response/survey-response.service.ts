import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateSurveyResponseInput } from './dto/create-survey-response.input';
import { UpdateSurveyResponseInput } from './dto/update-survey-response.input';
import { SurveyResponse } from './entities/survey-response.entity';

@Injectable()
export class SurveyResponseService {
  constructor(
    @InjectRepository(SurveyResponse)
    private surveyResponseRepository: Repository<SurveyResponse>,
    private entityManager: EntityManager,
    private dataSource: DataSource,
  ) {}

  private readonly logger = new Logger(SurveyResponseService.name);
  async create(
    createSurveyResponseInput: CreateSurveyResponseInput,
  ): Promise<SurveyResponse> {
    const newSurveyResponse = this.surveyResponseRepository.create(
      createSurveyResponseInput,
    );

    newSurveyResponse.user = await this.entityManager.findOneById(
      User,
      createSurveyResponseInput.userId,
    );
    newSurveyResponse.survey = await this.entityManager.findOneById(
      Survey,
      createSurveyResponseInput.surveyId,
    );
    newSurveyResponse.amountQuestion = newSurveyResponse.survey.amountQuestion;
    return await this.surveyResponseRepository.save(newSurveyResponse);
  }

  async findAll(): Promise<SurveyResponse[]> {
    const surveyResponse = await this.surveyResponseRepository.find();
    return surveyResponse;
  }

  async findOne(id: number): Promise<SurveyResponse> {
    const surveyResponse = await this.surveyResponseRepository.findOneBy({
      id,
    });
    if (!surveyResponse) {
      this.logger.error(
        new BadRequestException(`NOT FOUND SURVEYRESPONSE ID: ${id}`),
      );
      throw new BadRequestException(`NOT FOUND SURVEYRESPONSE ID: ${id}`);
    }
    return surveyResponse;
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
    const count = await this.surveyResponseRepository
      .createQueryBuilder('surveyResponse')
      .leftJoinAndSelect('surveyResponse.answer', 'answer')
      .select('sum(answer.score)')
      .where('answer.surveyResponseId= :id', { id: id })
      .groupBy('surveyResponse.userId')
      .getRawOne();

    this.logger.debug(count);
    return count;
  }
  async remove(id: number) {
    const surveyResponse = await this.findOne(id);
    return this.dataSource.manager.remove(surveyResponse);
  }
}

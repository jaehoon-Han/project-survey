import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
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

  async remove(id: number) {
    await this.removeAnswer(id);
    return await this.dataSource.manager.delete(SurveyResponse, id);
  }

  async removeAnswer(id: number): Promise<void> {
    await this.dataSource.manager.delete(Answer, {
      surverResponseId: id,
    });
  }
}

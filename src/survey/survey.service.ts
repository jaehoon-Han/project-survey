import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    private entityManager: EntityManager,
  ) {}

  async create(createSurveyInput: CreateSurveyInput): Promise<Survey> {
    const newSurvey = this.surveyRepository.create(createSurveyInput);
    newSurvey.amountQuestion = 0;
    await this.surveyRepository.save(newSurvey);
    return newSurvey;
  }

  async findAll() {
    return this.surveyRepository.find();
  }

  async findOne(id: number) {
    return this.validSurvey(id);
  }
  /**
   * @description "선택한 설문의 질문 조회"
   * @param id
   * @returns
   */
  async findQuestionAndOptionOfSurvey(id: number) {
    const result = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.question', 'question')
      .leftJoinAndSelect('question.questionOption', 'questionOption')
      .where('survey.id= :id', { id: id })
      .getMany();
    if (!result) {
      throw new Error(`CAN NOT FOUND SURVEY ID: ${id}`);
    }
    return result;
  }

  async update(id: number, updateSurveyInput: UpdateSurveyInput) {
    const survey = await this.findOne(id);
    this.surveyRepository.merge(survey, updateSurveyInput);
    return this.surveyRepository.update(id, survey);
  }

  async remove(id: number) {
    const survey = await this.findOne(id);
    return this.entityManager.remove(survey);
  }

  async validSurvey(id: number) {
    const survey = await this.surveyRepository.findOneBy({ id });
    if (!survey) {
      throw new Error(`CAN NOT FIND SURVEY! ID: ${id}`);
    }
    return survey;
  }
}

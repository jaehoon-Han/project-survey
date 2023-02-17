import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async create(createSurveyInput: CreateSurveyInput): Promise<Survey> {
    const newSurvey = this.surveyRepository.create(createSurveyInput);
    await this.surveyRepository.save(newSurvey);
    return newSurvey;
  }

  async findAll(): Promise<Survey[]> {
    const surveys = await this.surveyRepository.find();
    return surveys;
  }

  async findOne(id: number): Promise<Survey> {
    const survey = await this.surveyRepository.findOneBy({ id });
    return survey;
  }

  /**
   * @description "선택한 설문의 질문 조회"
   * @param id
   * @returns
   */
  async findDetail(id: number) {
    const result = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.question', 'question')
      .where('survey.id= :id', { id: id })
      .getMany();
    // console.log(result);

    return result;
  }

  async update(id: number, updateSurveyInput: UpdateSurveyInput) {
    const survey = await this.findOne(id);
    this.surveyRepository.merge(survey, updateSurveyInput);
    return this.surveyRepository.update(id, survey);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} survey`;
  // }
}

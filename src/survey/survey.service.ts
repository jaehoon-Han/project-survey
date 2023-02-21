import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    private dataSource: DataSource,
  ) {}
  private readonly logger = new Logger(SurveyService.name);

  async create(createSurveyInput: CreateSurveyInput): Promise<Survey> {
    const newSurvey = this.surveyRepository.create(createSurveyInput);
    newSurvey.amountQuestion = 0;
    await this.surveyRepository.save(newSurvey);
    return newSurvey;
  }

  async findAll(): Promise<Survey[]> {
    const result = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.question', 'question')
      .getMany();

    return result;
  }

  async findOne(id: number): Promise<Survey> {
    const survey = await this.surveyRepository.findOneBy({ id });
    if (!survey) {
      this.logger.error(new BadRequestException(`NOT FOUND SURVEY ID: ${id}`));
      throw new BadRequestException(`NOT FOUND SURVEY ID: ${id}`);
    }
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
    if (!result) {
      this.logger.error(new BadRequestException(`NOT FOUND SURVEY ID: ${id}`));
      throw new BadRequestException(`NOT FOUND SURVEY ID: ${id}`);
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
    return this.dataSource.manager.remove(survey);
  }
}

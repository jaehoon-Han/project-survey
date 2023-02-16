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
    // const result = await this.surveyRepository
    //   .createQueryBuilder('Survey')
    //   .innerJoin('survey.id', 'question')
    //   .where('survey.id = :surveyId', { surveyId: 4 })
    //   .getRawMany();

    // return result;
    // const result = await this.surveyRepository
    //   .createQueryBuilder()
    //   .select('survey')
    //   .from(Survey, 'survey')
    //   .where('survey.id= :id', { id: dataSource })
    //   .leftJoinAndSelect('survey.question', 'question')
    //   .getMany();

    // return result;

    const surveys = await this.surveyRepository.find();
    return surveys;
  }

  async findOne(id: number) {
    // const result = await this.surveyRepository
    //   .createQueryBuilder()
    //   .select('survey')
    //   .from(Survey, 'survey')
    //   .where('survey.id = :id', { id: id })
    //   .getOne();

    // return result;
    const survey = await this.surveyRepository.findOne({
      where: { id },
    });
    return survey;
  }

  async findDetail(id: number) {
    const result = await this.surveyRepository
      .createQueryBuilder()
      .select('survey')
      .from(Survey, 'survey')
      .where('survey.id= :id', { id: id })
      .leftJoinAndSelect('survey.question', 'question')
      .getMany();

    return result;
  }

  // async findOneById(id: number) {
  //   const qb = this.surveyRepository.createQueryBuilder('User')
  //   .leftJoinAndSelect('User.id','id')
  //   .leftJoinAndSelect('User.user')
  // }

  // update(id: number, updateSurveyInput: UpdateSurveyInput) {
  //   this.surveyRepository.update(updateSurveyInput);
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} survey`;
  // }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyStatusInput } from './dto/create-survey-status.input';
import { UpdateSurveyStatusInput } from './dto/update-survey-status.input';
import { SurveyStatus } from './entities/survey-status.entity';

@Injectable()
export class SurveyStatusService {
  constructor(
    @InjectRepository(SurveyStatus)
    private surveyStatusRepository: Repository<SurveyStatus>,
  ) {}

  async create(
    createSurveyStatusInput: CreateSurveyStatusInput,
  ): Promise<SurveyStatus> {
    const newSurveyStatus = this.surveyStatusRepository.create(
      createSurveyStatusInput,
    );
    await this.surveyStatusRepository.save(newSurveyStatus);
    return newSurveyStatus;
  }

  async findAll(): Promise<SurveyStatus[]> {
    const surveystatus = await this.surveyStatusRepository.find();
    return surveystatus;
  }

  async findOne(id: number): Promise<SurveyStatus> {
    const surveystatus = await this.surveyStatusRepository.findOne({
      where: { id },
    });
    return surveystatus;
  }
  update(id: number, updateSurveyStatusInput: UpdateSurveyStatusInput) {
    return `This action updates a #${id} surveyStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveyStatus`;
  }
}

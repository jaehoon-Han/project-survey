import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return await this.surveyResponseRepository.save(newSurveyResponse);
  }

  async findAll(): Promise<SurveyResponse[]> {
    const surveyResponse = await this.surveyResponseRepository.find();
    return surveyResponse;
  }

  async findOne(id: number): Promise<SurveyResponse> {
    const surveyResponse = await this.surveyResponseRepository.findOne({
      where: { id },
    });
    return surveyResponse;
  }

  update(id: number, updateSurveyResponseInput: UpdateSurveyResponseInput) {
    return `This action updates a #${id} surveyResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveyResponse`;
  }
}

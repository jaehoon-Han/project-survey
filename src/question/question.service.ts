import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/survey/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private entityManager: EntityManager,
  ) {}
  private readonly logger = new Logger(QuestionService.name);

  async create(createQuestionInput: CreateQuestionInput) {
    const newQuestion = this.questionRepository.create(createQuestionInput);

    const survey = await this.validSurvey(createQuestionInput.surveyId);

    newQuestion.survey = survey;

    survey.amountQuestion = survey.amountQuestion + 1;

    this.entityManager.update(Survey, createQuestionInput.surveyId, survey);
    return this.entityManager.save(newQuestion);
  }

  async findAll(): Promise<Question[]> {
    const result = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.questionOption', 'questionOption')
      .innerJoinAndSelect('question.survey', 'survey')
      .getMany();

    return result;
  }

  async findOne(id: number): Promise<Question> {
    return this.validQuestion(id);
  }

  /**
   * @description "선택한 질문의 답지 조회"
   * @param id
   * @returns
   */
  async findDetail(id: number) {
    const result = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.questionOption', 'questionOption')
      .innerJoinAndSelect('question.survey', 'survey')
      .where('question.id= :id', { id: id })
      .getMany();

    return result;
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const question = await this.findOne(id);
    this.questionRepository.merge(question, updateQuestionInput);
    return this.questionRepository.update(id, question);
  }

  async remove(id: number) {
    const question = await this.findOne(id);
    return this.entityManager.remove(question);
  }

  async validQuestion(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) {
      throw new Error(`CAN NOT FIND QUESTION! ID: ${id}`);
    }
    return question;
  }

  async validSurvey(surveyId: number) {
    const survey = await this.entityManager.findOneBy(Survey, {
      id: surveyId,
    });
    if (!survey) {
      throw new Error(`CAN NOT FIND THE SURVEY! ID: ${surveyId}`);
    } else {
      return survey;
    }
  }
}

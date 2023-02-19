import { Injectable } from '@nestjs/common';
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

  async create(createQuestionInput: CreateQuestionInput) {
    const newQuestion = this.questionRepository.create(createQuestionInput);
    newQuestion.survey = await this.entityManager.findOneById(
      Survey,
      createQuestionInput.surveyId,
    );
    return this.entityManager.save(newQuestion);
  }

  async findAll(): Promise<Question[]> {
    const question = await this.questionRepository.find();
    return question;
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
    });
    return question;
  }

  update(id: number, updateQuestionInput: UpdateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}

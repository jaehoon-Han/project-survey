import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/question/entities/question.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';
import { QuestionOption } from './entities/question-option.entity';

@Injectable()
export class QuestionOptionService {
  constructor(
    @InjectRepository(QuestionOption)
    private questionOptionRepository: Repository<QuestionOption>,
    private entityManager: EntityManager,
  ) {}
  private readonly logger = new Logger(QuestionOptionService.name);

  async create(
    createQuestionOptionInput: CreateQuestionOptionInput,
  ): Promise<QuestionOption> {
    const newQuestionOption = this.questionOptionRepository.create(
      createQuestionOptionInput,
    );
    newQuestionOption.question = await this.entityManager.findOneBy(Question, {
      id: createQuestionOptionInput.questionId,
    });
    return this.entityManager.save(newQuestionOption);
  }

  async findAll(): Promise<QuestionOption[]> {
    const questionOption = await this.questionOptionRepository.find();
    return questionOption;
  }

  async findOne(id: number): Promise<QuestionOption> {
    return this.validQuestionOption(id);
  }

  async update(
    id: number,
    updateQuestionOptionInput: UpdateQuestionOptionInput,
  ) {
    const questionOption = await this.findOne(id);
    this.questionOptionRepository.merge(
      questionOption,
      updateQuestionOptionInput,
    );
    return this.questionOptionRepository.update(id, questionOption);
  }

  async remove(id: number) {
    const questionOption = await this.findOne(id);
    return this.entityManager.remove(questionOption);
  }

  async validQuestionOption(id: number) {
    const questionOption = await this.questionOptionRepository.findOneBy({
      id,
    });
    if (!questionOption) {
      throw new Error(`CAN NOT FIND QUESTION OPTION! ID: ${id}`);
    }
    return questionOption;
  }

  async validQuestion(questionId: number) {
    const question = await this.entityManager.findOneBy(Question, {
      id: questionId,
    });
    if (!question) {
      throw new Error(`CAN NOT FIND THE QUESTION! ID: ${questionId}`);
    } else {
      return question;
    }
  }
}

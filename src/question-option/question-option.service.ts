import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/question/entities/question.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';
import { QuestionOption } from './entities/question-option.entity';

@Injectable()
export class QuestionOptionService {
  constructor(
    @InjectRepository(QuestionOption)
    private questionOptionRepository: Repository<QuestionOption>,
    private entityManager: EntityManager,
    private dataSource: DataSource,
  ) {}

  async create(
    createQuestionOptionInput: CreateQuestionOptionInput,
  ): Promise<QuestionOption> {
    const newQuestionOption = this.questionOptionRepository.create(
      createQuestionOptionInput,
    );
    newQuestionOption.question = await this.entityManager.findOneById(
      Question,
      createQuestionOptionInput.questionId,
    );
    return this.entityManager.save(newQuestionOption);
  }

  async findAll(): Promise<QuestionOption[]> {
    const questionOption = await this.questionOptionRepository.find();
    return questionOption;
  }

  async findOne(id: number): Promise<QuestionOption> {
    const questionOption = await this.questionOptionRepository.findOne({
      where: { id },
    });
    return questionOption;
  }

  update(id: number, updateQuestionOptionInput: UpdateQuestionOptionInput) {
    return `This action updates a #${id} questionOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionOption`;
  }
}

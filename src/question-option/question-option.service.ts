import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';
import { QuestionOption } from './entities/question-option.entity';

@Injectable()
export class QuestionOptionService {
  constructor(
    @InjectRepository(QuestionOption)
    private questionOptionRepository: Repository<QuestionOption>,
  ) {}

  async create(
    createQuestionOptionInput: CreateQuestionOptionInput,
  ): Promise<QuestionOption> {
    const newQuestionOption = this.questionOptionRepository.create(
      createQuestionOptionInput,
    );
    await this.questionOptionRepository.save(newQuestionOption);
    return newQuestionOption;
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

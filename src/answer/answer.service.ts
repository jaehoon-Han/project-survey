import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionOptionService } from 'src/question-option/question-option.service';
import { Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async create(createAnswerInput: CreateAnswerInput): Promise<Answer> {
    const newAnswer = this.answerRepository.create(createAnswerInput);
    await this.answerRepository.save(newAnswer);
    return newAnswer;
  }

  async findAll(): Promise<Answer[]> {
    const answers = await this.answerRepository.find();
    return answers;
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne({
      where: { id },
    });
    return answer;

    // const answer = await this.answerRepository
    //   .createQueryBuilder()
    //   .select('answer')
    //   .from(Answer, 'answer')
    //   .where('answer.id = :id', { id: id })
    //   .leftJoinAndSelect('answer')
    //   .getMany();

    // return answer;
  }

  update(id: number, updateAnswerInput: UpdateAnswerInput) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}

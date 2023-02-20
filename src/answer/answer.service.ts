import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private entityManager: EntityManager,
    private dataSource: DataSource,
  ) {}

  private readonly logger = new Logger(AnswerService.name);
  async create(
    createAnswerInput: CreateAnswerInput,
    questionOptionId: number,
  ): Promise<Answer> {
    const newAnswer = this.answerRepository.create(createAnswerInput);

    newAnswer.surveyResponse = await this.entityManager.findOneById(
      SurveyResponse,
      createAnswerInput.surveyResponseId,
    );
    newAnswer.questionOption = await this.findQuestionOptionContent(
      questionOptionId,
    );
    newAnswer.score = await this.findQuestionOptionScore(questionOptionId);
    newAnswer.question = await this.findQuestionContent(
      await this.findQuestionId(questionOptionId),
    );

    return this.entityManager.save(newAnswer);
  }

  async findAll(): Promise<Answer[]> {
    const answers = await this.answerRepository.find();
    return answers;
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.answerRepository.findOneBy({
      id,
    });
    if (!answer) {
      this.logger.error(new BadRequestException(`NOT FOUND SURVEY ID: ${id}`));
      throw new BadRequestException(`NOT FOUND ANSWER ID: ${id}`);
    }
    return answer;
  }

  async update(id: number, updateAnswerInput: UpdateAnswerInput) {
    const answer = await this.findOne(id);
    this.answerRepository.merge(answer, updateAnswerInput);
    return this.answerRepository.update(id, answer);
  }

  async remove(id: number) {
    const answer = await this.findOne(id);
    return this.dataSource.manager.remove(answer);
  }

  async findQuestion(questionId: number) {
    return await this.entityManager.findOneById(Question, questionId);
  }

  async findQuestionId(questionOptionId: number) {
    return (await this.findQuestionOption(questionOptionId)).questionId;
  }
  async findQuestionContent(questionId: number) {
    return (await this.findQuestion(questionId)).content;
  }

  async findQuestionOption(questionOptionId: number) {
    return this.entityManager.findOneById(QuestionOption, questionOptionId);
  }

  async findQuestionOptionContent(questionOptionId: number) {
    return (await this.findQuestionOption(questionOptionId)).content;
  }

  async findQuestionOptionScore(questionOptionId: number) {
    return (await this.findQuestionOption(questionOptionId)).score;
  }
}

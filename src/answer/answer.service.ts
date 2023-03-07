import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private entityManager: EntityManager,
  ) {}

  private readonly logger = new Logger(AnswerService.name);
  async create(
    createAnswerInput: CreateAnswerInput,
    questionOptionId: number,
  ): Promise<Answer> {
    const newAnswer = this.answerRepository.create(createAnswerInput);

    const surveyResponse = await this.validSurveyResponse(
      createAnswerInput.surveyResponseId,
    );

    this.checkComplete(surveyResponse, createAnswerInput.surveyResponseId);

    const findQuestionOptionInfo = await this.findQuestionOption(
      questionOptionId,
    );

    newAnswer.questionOption = findQuestionOptionInfo.content;
    newAnswer.score = findQuestionOptionInfo.score;
    newAnswer.question = await this.findQuestionContent(
      findQuestionOptionInfo.questionId,
    );

    return this.entityManager.save(newAnswer);
  }

  async findAll(): Promise<Answer[]> {
    const answers = await this.answerRepository.find();
    return answers;
  }

  async findOne(id: number): Promise<Answer> {
    return this.validAnswer(id);
  }

  async update(id: number, updateAnswerInput: UpdateAnswerInput) {
    const answer = await this.findOne(id);
    this.answerRepository.merge(answer, updateAnswerInput);
    return this.answerRepository.update(id, answer);
  }

  async remove(id: number) {
    const answer = await this.findOne(id);
    return this.entityManager.remove(answer);
  }

  async findQuestion(questionId: number) {
    return this.validQuestion(questionId);
  }

  async findQuestionContent(questionId: number) {
    return (await this.findQuestion(questionId)).content;
  }

  async findQuestionOption(questionOptionId: number) {
    return this.validQuestionOption(questionOptionId);
  }

  /**
   * @description "설문이 완료되었는지 확인"
   * @param id
   */
  async checkComplete(
    surveyResponse: SurveyResponse,
    surveyResponseId: number,
  ) {
    if (surveyResponse.amountAnswer >= surveyResponse.amountQuestion) {
      surveyResponse.isComplete = true;
    }
    surveyResponse.amountAnswer = surveyResponse.amountAnswer + 1;

    await this.entityManager.update(
      SurveyResponse,
      surveyResponseId,
      surveyResponse,
    );
  }

  async validAnswer(id: number) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) {
      throw new Error(`CAN NOT FIND ANSWER! ID: ${id}`);
    }
    return answer;
  }

  async validSurveyResponse(surveyResponseId: number) {
    const surveyResponse = await this.entityManager.findOneBy(SurveyResponse, {
      id: surveyResponseId,
    });
    if (!surveyResponse) {
      throw new Error(`CAN NOT FIND THE SURVEY! ID: ${surveyResponseId}`);
    } else {
      return surveyResponse;
    }
  }

  async validQuestion(questionId: number) {
    const question = await this.entityManager.findOneBy(Question, {
      id: questionId,
    });
    if (!question) {
      throw new Error(`CAN NOT FIND THE QUESTION! ID: ${question}`);
    } else {
      return question;
    }
  }

  async validQuestionOption(questionOptionId: number) {
    const questionOption = await this.entityManager.findOneBy(QuestionOption, {
      id: questionOptionId,
    });
    if (!questionOption) {
      throw new Error(
        `CAN NOT FIND THE QUESTION OPTION! ID: ${questionOption}`,
      );
    } else {
      return questionOption;
    }
  }
}

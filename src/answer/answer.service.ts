import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionCategory } from 'src/question-category/entities/question-category.entity';
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

  async create(
    input: CreateAnswerInput,
    questionOptionId: number,
  ): Promise<Answer> {
    const newAnswer = this.answerRepository.create(input);

    const surveyResponse = await this.validSurveyResponse(
      input.surveyResponseId,
    );

    this.checkComplete(surveyResponse, input.surveyResponseId);

    const findQuestionOptionInfo = await this.findQuestionOption(
      questionOptionId,
    );

    const questionInfo = await this.findQuestionContent(
      findQuestionOptionInfo.questionId,
    );

    newAnswer.questionOption = findQuestionOptionInfo.content;
    newAnswer.score = findQuestionOptionInfo.score;
    newAnswer.question = questionInfo.content;

    return this.entityManager.save(newAnswer);
  }

  async findAll() {
    return this.answerRepository.find();
  }

  async findOne(id: number) {
    return this.validAnswer(id);
  }

  async update(input: UpdateAnswerInput) {
    const answer = await this.findOne(input.id);
    const result = this.answerRepository.merge(answer, input);
    this.answerRepository.update(input.id, answer);
    return result;
  }

  async remove(id: number) {
    const answer = await this.findOne(id);
    return this.entityManager.remove(answer);
  }

  async findQuestion(questionId: number) {
    return this.validQuestion(questionId);
  }

  async findQuestionContent(questionId: number) {
    return await this.findQuestion(questionId);
  }

  async findQuestionOption(questionOptionId: number) {
    return this.validQuestionOption(questionOptionId);
  }

  //
  async findQuestionCategory(questionId: number) {
    return (await this.validQuestion(questionId)).questionCategory;
  }
  //

  /**
   * @description "설문이 완료되었는지 확인"
   * @param id
   */
  async checkComplete(
    surveyResponse: SurveyResponse,
    surveyResponseId: number,
  ) {
    if (surveyResponse.amountAnswer === surveyResponse.amountQuestion) {
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
    }
    return surveyResponse;
  }

  async validQuestion(questionId: number) {
    const question = await this.entityManager.findOneBy(Question, {
      id: questionId,
    });
    if (!question) {
      throw new Error(`CAN NOT FIND THE QUESTION! ID: ${question}`);
    }
    return question;
  }

  async validQuestionOption(questionOptionId: number) {
    const questionOption = await this.entityManager.findOneBy(QuestionOption, {
      id: questionOptionId,
    });
    if (!questionOption) {
      throw new Error(
        `CAN NOT FIND THE QUESTION OPTION! ID: ${questionOption}`,
      );
    }
    return questionOption;
  }

  // unless?
  async validQuestionCategory(questionCategoryId: number) {
    const questionCategory = await this.entityManager.findBy(QuestionCategory, {
      // id: questionCategoryId,
      questionId: questionCategoryId,
    });
    if (!questionCategory) {
      throw new Error(
        `CAN NOT FIND THE QUESTION CATEGORY! ID: ${questionCategory}`,
      );
    }
    return questionCategory;
  }
}

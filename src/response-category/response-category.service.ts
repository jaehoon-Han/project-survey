import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { CategoryScore } from 'src/category-score/entities/category-score.entity';
import { Category } from 'src/category/entities/category.entity';
import { QuestionCategory } from 'src/question-category/entities/question-category.entity';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateResponseCategoryInput } from './dto/create-response-category.input';
import { UpdateResponseCategoryInput } from './dto/update-response-category.input';
import { ResponseCategory } from './entities/response-category.entity';

@Injectable()
export class ResponseCategoryService {
  constructor(
    @InjectRepository(ResponseCategory)
    private repository: Repository<ResponseCategory>,
    private entityManager: EntityManager,
  ) {}

  async create(input: CreateResponseCategoryInput) {
    const surveyResponse = await this.validSurveyResponse(
      input.surveyResponseId,
    );
    const categories = await this.validCategoryOfSurvey(input.surveyId);
    const responseCategories = await Promise.all(
      categories.map((category) =>
        this.createResponseCategory(input, category, surveyResponse),
      ),
    );

    // const test = await this.findQuestionOfSurveyWithCategory(input.surveyId);
    // const testArray = [];
    // testArray.push(test.map((question) => question.questionCategory));

    // const testName = [];
    // testName.push(
    //   testArray.map((questionCategory) => questionCategory.categoryName),
    // );

    return this.repository.save(responseCategories);
  }

  private async createResponseCategory(
    input: CreateResponseCategoryInput,
    category: Category,
    surveyResponse: SurveyResponse,
  ): Promise<ResponseCategory> {
    const responseCategory = this.repository.create(input);
    responseCategory.categoryName = category.categoryName;
    responseCategory.totalScore = 0;
    responseCategory.surveyResponse = surveyResponse;
    return this.entityManager.save(responseCategory);
  }

  async findCategory(surveyResponseId: number) {
    const result = await this.repository
      .createQueryBuilder('responseCategory')
      .leftJoinAndSelect('responseCategory.surveyResponse', 'surveyResponse')
      .where('responseCategory.surveyResponseId= :surveyResponseId', {
        surveyResponseId: surveyResponseId,
      })
      .getMany();

    return result;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.validResponseCategory(id);
  }

  findSurvey(id: number) {
    return this.validSurvey(id);
  }

  async update(input: UpdateResponseCategoryInput) {
    const responseCategory = await this.validResponseCategory(input.id);
    const result = this.repository.merge(responseCategory, input);
    this.repository.update(input.id, responseCategory);
    return result;
  }

  remove(id: number) {
    const responseCategory = this.findOne(id);
    this.entityManager.remove(responseCategory);
    return responseCategory;
  }

  /**
   * @description "설문에 포함된 질문찾기 (category 포함)"
   * @param surveyId
   * @returns
   */
  async findQuestionOfSurveyWithCategory(surveyId: number) {
    const question = await this.entityManager
      .createQueryBuilder(Question, 'question')
      .leftJoinAndSelect('question.questionCategory', 'questionCategory')
      .where('question.surveyId= :surveyId', { surveyId: surveyId })
      .getMany();
    return question;
  }

  async findQuestionWithSurveyResponseId(input: number) {
    const question = await this.entityManager.findBy(Question, {
      surveyId: input,
    });
    return question;
  }

  async findAnswerWithSurveyResponseId(surveyResponseId: number) {
    return await this.entityManager.find(Answer, {
      where: { surveyResponseId: surveyResponseId },
    });
  }

  async validResponseCategory(id: number) {
    const responseCategory = await this.repository.findOneBy({ id });
    if (!responseCategory) {
      throw new Error(`CAN NOT FIND RESPONSE CATEGORY! ID: ${id}`);
    }
    return responseCategory;
  }

  async validCategoryOfSurvey(surveyId: number) {
    const category = await this.entityManager.findBy(Category, {
      surveyId: surveyId,
    });
    if (!category) {
      throw new Error(`CAN NOT FIND THE CATEGORY OF SURVEY! ID: ${surveyId}`);
    }
    return category;
  }

  async validSurveyResponse(surveyResponseId: number) {
    const surveyResponse = await this.entityManager.findOneBy(SurveyResponse, {
      id: surveyResponseId,
    });
    if (!surveyResponse) {
      throw new Error(
        `CAN NOT FIND THE SURVEY RESPONSE! ID: ${surveyResponse}`,
      );
    }
    if (surveyResponse.isComplete === false) {
      throw new Error(`SURVEY RESPONSE IS NOT COMPLETE! ID: ${surveyResponse}`);
    }
    return surveyResponse;
  }

  async validQuestionCategory(questionId: number) {
    const category = await this.entityManager.findBy(QuestionCategory, {
      questionId: questionId,
    });
    if (!category) {
      throw new Error(`CAN NOT FIND CATEGORY! QUESTION ID: ${questionId}`);
    }
    return category;
  }

  async validSurvey(surveyId: number) {
    const survey = await this.entityManager.findOneBy(Survey, {
      id: surveyId,
    });
    if (!survey) {
      throw new Error(`CAN NOT FIND SURVEY! SURVEY ID: ${surveyId}`);
    }
    return survey;
  }

  async findCategoryScore(categoryId: number) {
    const categoryScore = await this.entityManager.findOneBy(CategoryScore, {
      categoryId: categoryId,
    });
    if (!categoryScore) {
      throw new Error(`CAN NOT FIND CATEGORY! ID: ${categoryId}`);
    }
    return categoryScore;
  }
}

import { Injectable } from '@nestjs/common';
import { Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionCategory } from 'src/question-category/entities/question-category.entity';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
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

  async create(input: CreateQuestionInput) {
    const newQuestion = this.questionRepository.create(input);
    const survey = await this.validSurvey(input.surveyId);

    newQuestion.survey = survey;
    survey.amountQuestion = survey.amountQuestion + 1;

    this.entityManager.update(Survey, input.surveyId, survey);
    return this.entityManager.save(newQuestion);
  }

  async findAll() {
    return this.questionRepository.find();
  }

  async findOne(id: number) {
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

  /**
   * @description "특정 질문의 Category 조회"
   * @param id
   * @returns
   */
  async findOneCategoryOfQuestion(id: number) {
    const result = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.questionCategory', 'questionCategory')
      .innerJoinAndSelect('questionCategory.category', 'category')
      .where('question.id= :id', { id: id })
      .getMany();

    return result;
  }

  /**
   * @description "특정 설문의 질문들의 Category 조회"
   * @param id
   * @returns
   */
  async findAllCategoryOfQuestion(surveyId: number) {
    return await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.questionCategory', 'questionCategory')
      .innerJoinAndSelect('questionCategory.category', 'category')
      .andWhere(`question.surveyId = ${surveyId}`)
      .getMany();
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

  /**
   * @description "질문 복사"
   * @param id
   * @returns
   */
  async duplicateQuestion(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    const survey = await this.validSurvey(question.surveyId);

    const newQuestion = new Question();
    newQuestion.content = question.content;
    newQuestion.survey = question.survey;
    newQuestion.surveyId = question.surveyId;

    const copyQuestion = await this.entityManager.save(newQuestion);
    this.duplicateQuestionOption(id, copyQuestion);
    this.duplicateQuestionCategory(id, copyQuestion);

    newQuestion.survey = survey;
    survey.amountQuestion = survey.amountQuestion + 1;
    this.entityManager.update(Survey, question.surveyId, survey);

    return copyQuestion;
  }

  /**
   * @description "질문의 QuestionOption 복사"
   * @param id
   * @returns
   */
  async duplicateQuestionOption(id: number, copyQuestion: Question) {
    const questionOptions = await this.entityManager.findBy(QuestionOption, {
      questionId: id,
    });
    questionOptions.map((questionOption) => {
      const copyQuestionOption = this.entityManager.create(QuestionOption, {
        content: questionOption.content,
        question: copyQuestion,
        score: questionOption.score,
      });
      this.entityManager.save(copyQuestionOption);
    });
  }
  /**
   * @description "질문의 QuestionCategory 복사"
   * @param id
   * @returns
   */
  async duplicateQuestionCategory(id: number, copyQuestion: Question) {
    const questionCategory = await this.entityManager.findBy(QuestionCategory, {
      questionId: id,
    });

    questionCategory.map((questionCategory) => {
      const copyQuestionCategory = this.entityManager.create(QuestionCategory, {
        categoryId: questionCategory.categoryId,
        questionId: copyQuestion.id,
        question: copyQuestion,
        category: questionCategory.category,
        categoryName: questionCategory.categoryName,
      });

      this.entityManager.save(copyQuestionCategory);
    });
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
    }
    return survey;
  }
}

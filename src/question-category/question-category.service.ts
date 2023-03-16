import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Question } from 'src/question/entities/question.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateQuestionCategoryInput } from './dto/create-question-category.input';
import { UpdateQuestionCategoryInput } from './dto/update-question-category.input';
import { QuestionCategory } from './entities/question-category.entity';

@Injectable()
export class QuestionCategoryService {
  constructor(
    @InjectRepository(QuestionCategory)
    private repository: Repository<QuestionCategory>,
    private entityManager: EntityManager,
  ) {}
  async create(input: CreateQuestionCategoryInput): Promise<QuestionCategory> {
    const newQuestionCategory = this.repository.create(input);

    const question = await this.validQuestion(input.questionId);
    newQuestionCategory.question = question;

    const category = await this.validCategory(input.categoryId);
    newQuestionCategory.category = category;

    newQuestionCategory.categoryName = category.categoryName;

    return await this.repository.save(newQuestionCategory);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.validQuestionCategory(id);
  }

  async update(input: UpdateQuestionCategoryInput) {
    const questionCategory = await this.validQuestionCategory(input.id);
    if (input.questionId) {
      const question = await this.validQuestion(input.questionId);
      questionCategory.question = question;
    }
    if (input.categoryId) {
      const category = await this.validCategory(input.categoryId);
      questionCategory.category = category;
      questionCategory.categoryName = category.categoryName;
    }
    const result = this.repository.merge(questionCategory, input);
    this.repository.update(input.id, questionCategory);
    return result;
  }

  remove(id: number) {
    const questionCategory = this.findOne(id);
    this.entityManager.remove(questionCategory);
    return questionCategory;
  }

  async validQuestionCategory(id: number) {
    const questionCategory = await this.repository.findOneBy({ id });
    if (!questionCategory) {
      throw new Error(`CAN NOT FIND Question Category! ID: ${id}`);
    }
    return questionCategory;
  }

  async validQuestion(questionId: number) {
    const question = await this.entityManager.findOneBy(Question, {
      id: questionId,
    });
    if (!question) {
      throw new Error(`CAN NOT FIND THE question! ID: ${questionId}`);
    }
    return question;
  }

  async validCategory(categoryId: number) {
    const category = await this.entityManager.findOneBy(Category, {
      id: categoryId,
    });
    if (!category) {
      throw new Error(`CAN NOT FIND THE CATEGORY! ID: ${categoryId}`);
    }
    return category;
  }
}

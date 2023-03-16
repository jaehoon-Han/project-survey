import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryScore } from 'src/category-score/entities/category-score.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private entityManager: EntityManager,
  ) {}

  async create(input: CreateCategoryInput): Promise<Category> {
    const newCategory = this.categoryRepository.create(input);
    return await this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.validCategory(id);
  }

  async update(input: UpdateCategoryInput) {
    const category = await this.validCategory(input.id);
    const result = this.categoryRepository.merge(category, input);
    this.categoryRepository.update(input.id, category);
    return result;
  }

  async remove(id: number) {
    const category = await this.validCategory(id);
    this.categoryRepository.delete(id);
    return category;
  }
  /**
   * @description "선택한 Category의 기준 점수와 메세지 조회"
   * @param id
   * @returns
   */
  async findCategoryScoreOfCategory(id: number) {
    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.categoryScore', 'categoryScore')
      .where('category.id= :id', { id: id })
      .getOne();

    return result;
  }

  async testingQueryBuilder(id: number) {
    const category = await this.findOne(id);
    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.questionCategory', 'questionCategory')
      .innerJoinAndSelect('questionCategory.question', 'question')
      .where('category.id= :id', {
        id: id,
      })
      .getMany();

    return result;
  }

  /**
   * @description "설문(질문)이 어떤 Category를 포함하는지"
   * @param
   * @returns
   */
  async findQuestionOfCategory(id: number) {
    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.questionCategory', 'questionCategory')
      .innerJoinAndSelect('questionCategory.question', 'question')
      .where('category.id= :id', {
        id: id,
      })
      .getMany();

    return result;
  }

  /**
   * @description "설문이 어떤 Category를 포함하는지"
   * @param
   * @returns
   */ async findCategoryOfSurvey(surveyId: number) {
    return this.categoryRepository.findBy({ surveyId: surveyId });
  }

  async validCategory(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error(`CAN NOT FIND Category! ID: ${id}`);
    }
    return category;
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

  async validCategoryScore(categoryScoreId: number) {
    const categoryScore = await this.entityManager.findOneBy(CategoryScore, {
      id: categoryScoreId,
    });
    if (!categoryScore) {
      throw new Error(
        `CAN NOT FIND THE CATEGORY SCORE! ID: ${categoryScoreId}`,
      );
    }
    return categoryScore;
  }
}

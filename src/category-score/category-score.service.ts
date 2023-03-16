import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateCategoryScoreInput } from './dto/create-category-score.input';
import { UpdateCategoryScoreInput } from './dto/update-category-score.input';
import { CategoryScore } from './entities/category-score.entity';

@Injectable()
export class CategoryScoreService {
  constructor(
    @InjectRepository(CategoryScore)
    private categoryScoreRepository: Repository<CategoryScore>,
    private entityManager: EntityManager,
  ) {}

  async create(input: CreateCategoryScoreInput) {
    const newCategoryScore = this.categoryScoreRepository.create(input);

    const category = await this.validCategory(input.categoryId);

    newCategoryScore.category = category;

    return this.categoryScoreRepository.save(newCategoryScore);
  }

  findAll() {
    return this.categoryScoreRepository.find();
  }

  findOne(id: number) {
    return this.validCategoryScore(id);
  }

  remove(id: number) {
    const categoryScore = this.validCategoryScore(id);
    this.categoryScoreRepository.delete(id);
    return categoryScore;
  }

  async validCategoryScore(id: number) {
    const categoryScore = await this.categoryScoreRepository.findOneBy({ id });
    if (!categoryScore) {
      throw new Error(`CAN NOT FIND CATEGORY SCORE! ID: ${id}`);
    }
    return categoryScore;
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

import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryScoreModule } from 'src/category-score/category-score.module';
import { QuestionCategoryModule } from 'src/question-category/question-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    CategoryScoreModule,
    QuestionCategoryModule,
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}

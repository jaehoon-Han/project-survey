import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionOptionModule } from 'src/question-option/question-option.module';
import { QuestionCategoryModule } from 'src/question-category/question-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    QuestionOptionModule,
    QuestionCategoryModule,
  ],
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}

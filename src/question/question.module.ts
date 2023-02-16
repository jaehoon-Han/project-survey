import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { SurveyService } from 'src/survey/survey.service';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { QuestionOptionService } from 'src/question-option/question-option.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Survey]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([QuestionOption]),
  ],
  exports: [QuestionService],
  providers: [QuestionResolver, QuestionService, QuestionOptionService],
})
export class QuestionModule {}

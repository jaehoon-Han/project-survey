import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyResponseModule } from 'src/survey-response/survey-response.module';
import { QuestionModule } from 'src/question/question.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey]),
    SurveyResponseModule,
    QuestionModule,
    CategoryModule,
  ],
  providers: [SurveyResolver, SurveyService],
})
export class SurveyModule {}

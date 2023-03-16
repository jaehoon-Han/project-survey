import { Module } from '@nestjs/common';
import { SurveyResponseService } from './survey-response.service';
import { SurveyResponseResolver } from './survey-response.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponse } from './entities/survey-response.entity';
import { AnswerModule } from 'src/answer/answer.module';
import { ResponseCategoryModule } from 'src/response-category/response-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyResponse]),
    AnswerModule,
    ResponseCategoryModule,
  ],
  providers: [SurveyResponseResolver, SurveyResponseService],
})
export class SurveyResponseModule {}

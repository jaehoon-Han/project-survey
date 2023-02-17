import { Module } from '@nestjs/common';
import { SurveyResponseService } from './survey-response.service';
import { SurveyResponseResolver } from './survey-response.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponse } from './entities/survey-response.entity';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  imports: [AnswerModule, TypeOrmModule.forFeature([SurveyResponse])],
  providers: [SurveyResponseResolver, SurveyResponseService],
})
export class SurveyResponseModule {}

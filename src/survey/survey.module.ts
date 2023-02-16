import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Question } from 'src/question/entities/question.entity';
import { SurveyStatus } from 'src/survey-status/entities/survey-status.entity';
import { SurveyResponseService } from 'src/survey-response/survey-response.service';
import { QuestionService } from 'src/question/question.service';
import { SurveyStatusService } from 'src/survey-status/survey-status.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([SurveyResponse]),
    TypeOrmModule.forFeature([Survey]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([SurveyStatus]),
  ],
  exports: [SurveyService],
  providers: [
    SurveyResolver,
    SurveyService,
    // SurveyResponseService,
    QuestionService,
    SurveyStatusService,
  ],
})
export class SurveyModule {}

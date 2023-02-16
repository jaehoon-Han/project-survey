import { Module } from '@nestjs/common';
import { SurveyResponseService } from './survey-response.service';
import { SurveyResponseResolver } from './survey-response.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponse } from './entities/survey-response.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { AnswerService } from 'src/answer/answer.service';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { QuestionOptionService } from 'src/question-option/question-option.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([SurveyResponse]),
    TypeOrmModule.forFeature([QuestionOption]),
  ],
  providers: [
    SurveyResponseResolver,
    SurveyResponseService,
    AnswerService,
    QuestionOptionService,
  ],
})
export class SurveyResponseModule {}

import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { QuestionOptionService } from 'src/question-option/question-option.service';
import { SurveyResponseService } from 'src/survey-response/survey-response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionOption]),
    TypeOrmModule.forFeature([SurveyResponse]),
    TypeOrmModule.forFeature([Answer]),
  ],
  providers: [
    AnswerResolver,
    AnswerService,
    QuestionOptionService,
    SurveyResponseService,
  ],
})
export class AnswerModule {}

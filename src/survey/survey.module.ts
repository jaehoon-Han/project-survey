import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyResponseModule } from 'src/survey-response/survey-response.module';
import { SurveyStatusModule } from 'src/survey-status/survey-status.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey]),
    SurveyResponseModule,
    SurveyStatusModule,
    QuestionModule,
  ],
  providers: [SurveyResolver, SurveyService],
  exports: [TypeOrmModule],
})
export class SurveyModule {}

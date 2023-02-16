import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { SurveyResponseService } from 'src/survey-response/survey-response.service';
import { Answer } from 'src/answer/entities/answer.entity';
import { AnswerService } from 'src/answer/answer.service';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { QuestionOptionService } from 'src/question-option/question-option.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyResponse]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([QuestionOption]),
  ],
  providers: [
    UserResolver,
    UserService,
    SurveyResponseService,
    AnswerService,
    QuestionOptionService,
  ],
})
export class UserModule {}

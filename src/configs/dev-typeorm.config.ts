import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Question } from 'src/question/entities/question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres3',
  entities: [Answer, Question, QuestionOption, Survey, SurveyResponse, User],
  synchronize: true,
};

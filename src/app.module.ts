import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { SurveyModule } from './survey/survey.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { SurveyStatusModule } from './survey-status/survey-status.module';
import { SurveyResponseModule } from './survey-response/survey-response.module';
import { QuestionOptionModule } from './question-option/question-option.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    UserModule,
    SurveyModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionOptionModule } from 'src/question-option/question-option.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), QuestionOptionModule],
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}

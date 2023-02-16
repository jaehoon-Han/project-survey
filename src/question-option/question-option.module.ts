import { Module } from '@nestjs/common';
import { QuestionOptionService } from './question-option.service';
import { QuestionOptionResolver } from './question-option.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionOption } from './entities/question-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionOption])],
  providers: [QuestionOptionResolver, QuestionOptionService],
})
export class QuestionOptionModule {}

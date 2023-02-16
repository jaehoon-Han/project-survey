import { Module } from '@nestjs/common';
import { SurveyStatusService } from './survey-status.service';
import { SurveyStatusResolver } from './survey-status.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyStatus } from './entities/survey-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyStatus])],
  providers: [SurveyStatusResolver, SurveyStatusService],
})
export class SurveyStatusModule {}

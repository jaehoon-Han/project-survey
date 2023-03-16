import { Answer } from 'src/answer/entities/answer.entity';
import { CategoryScore } from 'src/category-score/entities/category-score.entity';
import { Category } from 'src/category/entities/category.entity';
import { QuestionCategory } from 'src/question-category/entities/question-category.entity';
import { QuestionOption } from 'src/question-option/entities/question-option.entity';
import { Question } from 'src/question/entities/question.entity';
import { ResponseCategory } from 'src/response-category/entities/response-category.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';

export const MockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  findBy: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),

  createQueryBuilder: jest.fn().mockReturnValue({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis(),
  }),
});

export const mockQuestionOption = (): QuestionOption => {
  return {
    id: 1,
    questionId: 1,
    content: 'TEST',
    score: 1,
    question: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };
};

export const mockSurveyResponse = (): SurveyResponse => {
  return {
    amountAnswer: 1,
    amountQuestion: 1,
    isComplete: true,
    totalScore: 0,
    survey: undefined,
    user: undefined,
    answer: undefined,
    id: 0,
    createdAt: undefined,
    updatedAt: undefined,
    responseCategory: undefined,
    surveyId: 1,
    userId: 1,
  };
};

export const mockSurvey = (): Survey => {
  return {
    id: 1,
    title: '테스트 title',
    description: '테스트 description',
    amountQuestion: 1,
    createdAt: undefined,
    updatedAt: undefined,
    question: [],
    surveyResponse: [],
    category: undefined,
  };
};

export const mockQuestionCategory = (): QuestionCategory => {
  return {
    id: 1,
    createdAt: undefined,
    updatedAt: undefined,
    questionId: 1,
    question: undefined,
    categoryId: 1,
    category: undefined,
    categoryName: undefined,
  };
};

export const mockQuestion = (): Question => {
  return {
    id: 1,
    content: 'TEST',
    survey: undefined,
    surveyId: 1,
    questionOption: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    questionCategory: undefined,
  };
};

export const mockCategoryScore = (): CategoryScore => {
  return {
    id: 1,
    createdAt: undefined,
    updatedAt: undefined,
    categoryId: undefined,
    minScore: 33,
    maxScore: 66,
    message: 'TEST',
    category: undefined,
  };
};
export const mockUser = (): User => {
  return {
    id: 1,
    name: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    surveyResponse: undefined,
  };
};

export const mockAnswer = (): Answer => {
  return {
    id: 1,
    surveyResponseId: 1,
    surveyResponse: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    score: undefined,
    question: undefined,
    questionOption: undefined,
  };
};

export const mockCategory = (): Category => {
  return {
    id: 1,
    categoryName: '테스트',
    createdAt: undefined,
    updatedAt: undefined,
    categoryScore: undefined,
    questionCategory: undefined,
    surveyId: undefined,
    survey: undefined,
  };
};

export const mockResponseCategory = (): ResponseCategory => {
  return {
    id: 1,
    createdAt: undefined,
    updatedAt: undefined,
    surveyResponseId: 1,
    categoryName: undefined,
    totalScore: 0,
    message: undefined,
    surveyResponse: undefined,
  };
};

// Mock 이란? : https://www.crocus.co.kr/1555

export const MockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
});

export const MockQuestionOption = {
  content: '그렇다',
  score: 1,
  questionId: 3,
};

export const MockQuestion = {
  content: '테스트',
};

export const MockSurveyResponse = {
  amountAnswer: 0,
  amountQuestion: 1,
  isComplete: false,
};

export const MockSurvey = {
  title: '테스트',
  description: '테스트 description',
  amountQuestion: 1,
};

export const MockUser = {
  name: '테스트',
};

export const MockAnswer = {
  id: 1,
  question: 'question.content 테스트',
  questionOption: 'questionOption.content 테스트',
  score: 'questionOption.score 테스트',
};

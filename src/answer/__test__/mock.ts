// Mock 은 예상되는 기대값으로 미리 프로그래밍 객체입니다

export const AnswersService = jest.fn().mockReturnValue({
  getAnswerbyId: jest.fn().mockResolvedValue(answerStub()),
  getAnswers: jest.fn().mockResolvedValue(answerStub()),
  createAnswer: jest.fn().mockResolvedValue(answerStub()),
  updateAnswer: jest.fn().mockResolvedValue(answerStub()),
});

// const QuestionOptionMock = {
//   id: 1,
//   questionId: 1,
//   score: 1,
//   content: '밀키스',
// };

// const SurveyResponseMock = {
//   id: 1,
//   amountAnswer: 0,
//   amountQuestion: 1,
//   isComplete: false,
// };

// const QuestionMock = {
//   id: 1,
//   content: '밀키스',
// };

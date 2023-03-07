"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AnswerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_option_entity_1 = require("../question-option/entities/question-option.entity");
const question_entity_1 = require("../question/entities/question.entity");
const survey_response_entity_1 = require("../survey-response/entities/survey-response.entity");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("./entities/answer.entity");
let AnswerService = AnswerService_1 = class AnswerService {
    constructor(answerRepository, entityManager) {
        this.answerRepository = answerRepository;
        this.entityManager = entityManager;
        this.logger = new common_1.Logger(AnswerService_1.name);
    }
    async create(createAnswerInput, questionOptionId) {
        const newAnswer = this.answerRepository.create(createAnswerInput);
        const surveyResponse = await this.validSurveyResponse(createAnswerInput.surveyResponseId);
        this.checkComplete(surveyResponse, createAnswerInput.surveyResponseId);
        const findQuestionOptionInfo = await this.findQuestionOption(questionOptionId);
        newAnswer.questionOption = findQuestionOptionInfo.content;
        newAnswer.score = findQuestionOptionInfo.score;
        newAnswer.question = await this.findQuestionContent(findQuestionOptionInfo.questionId);
        return this.entityManager.save(newAnswer);
    }
    async findAll() {
        const answers = await this.answerRepository.find();
        return answers;
    }
    async findOne(id) {
        return this.validAnswer(id);
    }
    async update(id, updateAnswerInput) {
        const answer = await this.findOne(id);
        this.answerRepository.merge(answer, updateAnswerInput);
        return this.answerRepository.update(id, answer);
    }
    async remove(id) {
        const answer = await this.findOne(id);
        return this.entityManager.remove(answer);
    }
    async findQuestion(questionId) {
        return this.validQuestion(questionId);
    }
    async findQuestionContent(questionId) {
        return (await this.findQuestion(questionId)).content;
    }
    async findQuestionOption(questionOptionId) {
        return this.validQuestionOption(questionOptionId);
    }
    async checkComplete(surveyResponse, surveyResponseId) {
        if (surveyResponse.amountAnswer >= surveyResponse.amountQuestion) {
            surveyResponse.isComplete = true;
        }
        surveyResponse.amountAnswer = surveyResponse.amountAnswer + 1;
        await this.entityManager.update(survey_response_entity_1.SurveyResponse, surveyResponseId, surveyResponse);
    }
    async validAnswer(id) {
        const answer = await this.answerRepository.findOneBy({ id });
        if (!answer) {
            throw new Error(`CAN NOT FIND ANSWER! ID: ${id}`);
        }
        return answer;
    }
    async validSurveyResponse(surveyResponseId) {
        const surveyResponse = await this.entityManager.findOneBy(survey_response_entity_1.SurveyResponse, {
            id: surveyResponseId,
        });
        if (!surveyResponse) {
            throw new Error(`CAN NOT FIND THE SURVEY! ID: ${surveyResponseId}`);
        }
        else {
            return surveyResponse;
        }
    }
    async validQuestion(questionId) {
        const question = await this.entityManager.findOneBy(question_entity_1.Question, {
            id: questionId,
        });
        if (!question) {
            throw new Error(`CAN NOT FIND THE QUESTION! ID: ${question}`);
        }
        else {
            return question;
        }
    }
    async validQuestionOption(questionOptionId) {
        const questionOption = await this.entityManager.findOneBy(question_option_entity_1.QuestionOption, {
            id: questionOptionId,
        });
        if (!questionOption) {
            throw new Error(`CAN NOT FIND THE QUESTION OPTION! ID: ${questionOption}`);
        }
        else {
            return questionOption;
        }
    }
};
AnswerService = AnswerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map
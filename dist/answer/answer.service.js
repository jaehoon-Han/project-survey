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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_category_entity_1 = require("../question-category/entities/question-category.entity");
const question_option_entity_1 = require("../question-option/entities/question-option.entity");
const question_entity_1 = require("../question/entities/question.entity");
const survey_response_entity_1 = require("../survey-response/entities/survey-response.entity");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("./entities/answer.entity");
let AnswerService = class AnswerService {
    constructor(answerRepository, entityManager) {
        this.answerRepository = answerRepository;
        this.entityManager = entityManager;
    }
    async create(input, questionOptionId) {
        const newAnswer = this.answerRepository.create(input);
        const surveyResponse = await this.validSurveyResponse(input.surveyResponseId);
        this.checkComplete(surveyResponse, input.surveyResponseId);
        const findQuestionOptionInfo = await this.findQuestionOption(questionOptionId);
        const questionInfo = await this.findQuestionContent(findQuestionOptionInfo.questionId);
        newAnswer.questionOption = findQuestionOptionInfo.content;
        newAnswer.score = findQuestionOptionInfo.score;
        newAnswer.question = questionInfo.content;
        return this.entityManager.save(newAnswer);
    }
    async findAll() {
        return this.answerRepository.find();
    }
    async findOne(id) {
        return this.validAnswer(id);
    }
    async update(input) {
        const answer = await this.findOne(input.id);
        const result = this.answerRepository.merge(answer, input);
        this.answerRepository.update(input.id, answer);
        return result;
    }
    async remove(id) {
        const answer = await this.findOne(id);
        return this.entityManager.remove(answer);
    }
    async findQuestion(questionId) {
        return this.validQuestion(questionId);
    }
    async findQuestionContent(questionId) {
        return await this.findQuestion(questionId);
    }
    async findQuestionOption(questionOptionId) {
        return this.validQuestionOption(questionOptionId);
    }
    async findQuestionCategory(questionId) {
        return (await this.validQuestion(questionId)).questionCategory;
    }
    async checkComplete(surveyResponse, surveyResponseId) {
        if (surveyResponse.amountAnswer === surveyResponse.amountQuestion) {
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
        return surveyResponse;
    }
    async validQuestion(questionId) {
        const question = await this.entityManager.findOneBy(question_entity_1.Question, {
            id: questionId,
        });
        if (!question) {
            throw new Error(`CAN NOT FIND THE QUESTION! ID: ${question}`);
        }
        return question;
    }
    async validQuestionOption(questionOptionId) {
        const questionOption = await this.entityManager.findOneBy(question_option_entity_1.QuestionOption, {
            id: questionOptionId,
        });
        if (!questionOption) {
            throw new Error(`CAN NOT FIND THE QUESTION OPTION! ID: ${questionOption}`);
        }
        return questionOption;
    }
    async validQuestionCategory(questionCategoryId) {
        const questionCategory = await this.entityManager.findBy(question_category_entity_1.QuestionCategory, {
            questionId: questionCategoryId,
        });
        if (!questionCategory) {
            throw new Error(`CAN NOT FIND THE QUESTION CATEGORY! ID: ${questionCategory}`);
        }
        return questionCategory;
    }
};
AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map
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
const question_option_entity_1 = require("../question-option/entities/question-option.entity");
const question_entity_1 = require("../question/entities/question.entity");
const survey_response_entity_1 = require("../survey-response/entities/survey-response.entity");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("./entities/answer.entity");
let AnswerService = class AnswerService {
    constructor(answerRepository, entityManager, dataSource) {
        this.answerRepository = answerRepository;
        this.entityManager = entityManager;
        this.dataSource = dataSource;
    }
    async create(createAnswerInput, questionOptionId) {
        const newAnswer = this.answerRepository.create(createAnswerInput);
        newAnswer.surveyResponse = await this.entityManager.findOneById(survey_response_entity_1.SurveyResponse, createAnswerInput.surveyResponseId);
        newAnswer.questionOption = await this.findQuestionOptionContent(questionOptionId);
        newAnswer.score = await this.findQuestionOptionScore(questionOptionId);
        newAnswer.question = await this.findQuestionContent(await this.findQuestionId(questionOptionId));
        return this.entityManager.save(newAnswer);
    }
    async findAll() {
        const answers = await this.answerRepository.find();
        return answers;
    }
    async findOne(id) {
        const answer = await this.answerRepository.findOneBy({
            id,
        });
        if (!answer) {
            throw new common_1.BadRequestException(`NOT FOUND ANSWER ID: ${id}`);
        }
        return answer;
    }
    async update(id, updateAnswerInput) {
        const answer = await this.findOne(id);
        this.answerRepository.merge(answer, updateAnswerInput);
        return this.answerRepository.update(id, answer);
    }
    async remove(id) {
        const answer = await this.findOne(id);
        return this.dataSource.manager.remove(answer);
    }
    async findQuestion(questionId) {
        return await this.entityManager.findOneById(question_entity_1.Question, questionId);
    }
    async findQuestionId(questionOptionId) {
        return (await this.findQuestionOption(questionOptionId)).questionId;
    }
    async findQuestionContent(questionId) {
        return (await this.findQuestion(questionId)).content;
    }
    async findQuestionOption(questionOptionId) {
        return this.entityManager.findOneById(question_option_entity_1.QuestionOption, questionOptionId);
    }
    async findQuestionOptionContent(questionOptionId) {
        return (await this.findQuestionOption(questionOptionId)).content;
    }
    async findQuestionOptionScore(questionOptionId) {
        return (await this.findQuestionOption(questionOptionId)).score;
    }
};
AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map
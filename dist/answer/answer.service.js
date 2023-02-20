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
const survey_response_entity_1 = require("../survey-response/entities/survey-response.entity");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("./entities/answer.entity");
let AnswerService = class AnswerService {
    constructor(answerRepository, entityManager, dataSource) {
        this.answerRepository = answerRepository;
        this.entityManager = entityManager;
        this.dataSource = dataSource;
    }
    async create(createAnswerInput) {
        const newAnswer = this.answerRepository.create(createAnswerInput);
        newAnswer.surveyResponse = await this.entityManager.findOneById(survey_response_entity_1.SurveyResponse, createAnswerInput.surveyResponseId);
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
        return answer;
    }
    async update(id, updateAnswerInput) {
        const answer = await this.findOne(id);
        this.answerRepository.merge(answer, updateAnswerInput);
        return this.answerRepository.update(id, answer);
    }
    remove(id) {
        return `This action removes a #${id} answer`;
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
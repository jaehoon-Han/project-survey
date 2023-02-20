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
exports.SurveyResponseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_entity_1 = require("../survey/entities/survey.entity");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const survey_response_entity_1 = require("./entities/survey-response.entity");
let SurveyResponseService = class SurveyResponseService {
    constructor(surveyResponseRepository, entityManager, dataSource) {
        this.surveyResponseRepository = surveyResponseRepository;
        this.entityManager = entityManager;
        this.dataSource = dataSource;
    }
    async create(createSurveyResponseInput) {
        const newSurveyResponse = this.surveyResponseRepository.create(createSurveyResponseInput);
        newSurveyResponse.user = await this.entityManager.findOneById(user_entity_1.User, createSurveyResponseInput.userId);
        newSurveyResponse.survey = await this.entityManager.findOneById(survey_entity_1.Survey, createSurveyResponseInput.surveyId);
        return await this.surveyResponseRepository.save(newSurveyResponse);
    }
    async findAll() {
        const surveyResponse = await this.surveyResponseRepository.find();
        return surveyResponse;
    }
    async findOne(id) {
        const surveyResponse = await this.surveyResponseRepository.findOneBy({
            id,
        });
        if (!surveyResponse) {
            throw new common_1.BadRequestException(`NOT FOUND SURVEYRESPONSE ID: ${id}`);
        }
        return surveyResponse;
    }
    async findDetail(id) {
        const result = await this.surveyResponseRepository
            .createQueryBuilder('surveyResponse')
            .leftJoinAndSelect('surveyResponse.answer', 'answer')
            .where('surveyResponse.id= :id', { id: id })
            .getMany();
        return result;
    }
    async update(id, updateSurveyResponseInput) {
        const surveyResponse = await this.findOne(id);
        this.surveyResponseRepository.merge(surveyResponse, updateSurveyResponseInput);
        return this.surveyResponseRepository.update(id, surveyResponse);
    }
    async updateScore(id) {
        const surveyResponse = await this.findOne(id);
        surveyResponse.totalScore = await this.countScore(id);
        return this.surveyResponseRepository.update(id, surveyResponse);
    }
    async countScore(id) {
        const count = await this.surveyResponseRepository
            .createQueryBuilder('surveyResponse')
            .leftJoinAndSelect('surveyResponse.answer', 'answer')
            .select('sum(answer.score)')
            .where('answer.surveyResponseId= :id', { id: id })
            .groupBy('surveyResponse.userId')
            .getRawOne();
        return count;
    }
    async remove(id) {
        const surveyResponse = await this.findOne(id);
        return this.dataSource.manager.remove(surveyResponse);
    }
};
SurveyResponseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_response_entity_1.SurveyResponse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource])
], SurveyResponseService);
exports.SurveyResponseService = SurveyResponseService;
//# sourceMappingURL=survey-response.service.js.map
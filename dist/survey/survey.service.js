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
exports.SurveyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const survey_entity_1 = require("./entities/survey.entity");
let SurveyService = class SurveyService {
    constructor(surveyRepository, entityManager) {
        this.surveyRepository = surveyRepository;
        this.entityManager = entityManager;
    }
    async create(createSurveyInput) {
        const newSurvey = this.surveyRepository.create(createSurveyInput);
        newSurvey.amountQuestion = 0;
        await this.surveyRepository.save(newSurvey);
        return newSurvey;
    }
    async findAll() {
        return this.surveyRepository.find();
    }
    async findOne(id) {
        return this.validSurvey(id);
    }
    async findQuestionAndOptionOfSurvey(id) {
        const result = await this.surveyRepository
            .createQueryBuilder('survey')
            .leftJoinAndSelect('survey.question', 'question')
            .leftJoinAndSelect('question.questionOption', 'questionOption')
            .where('survey.id= :id', { id: id })
            .getMany();
        if (!result) {
            throw new Error(`CAN NOT FOUND SURVEY ID: ${id}`);
        }
        return result;
    }
    async update(id, updateSurveyInput) {
        const survey = await this.findOne(id);
        this.surveyRepository.merge(survey, updateSurveyInput);
        return this.surveyRepository.update(id, survey);
    }
    async remove(id) {
        const survey = await this.findOne(id);
        return this.entityManager.remove(survey);
    }
    async validSurvey(id) {
        const survey = await this.surveyRepository.findOneBy({ id });
        if (!survey) {
            throw new Error(`CAN NOT FIND SURVEY! ID: ${id}`);
        }
        return survey;
    }
};
SurveyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], SurveyService);
exports.SurveyService = SurveyService;
//# sourceMappingURL=survey.service.js.map
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
var SurveyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const survey_entity_1 = require("./entities/survey.entity");
let SurveyService = SurveyService_1 = class SurveyService {
    constructor(surveyRepository, dataSource) {
        this.surveyRepository = surveyRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(SurveyService_1.name);
    }
    async create(createSurveyInput) {
        const newSurvey = this.surveyRepository.create(createSurveyInput);
        newSurvey.amountQuestion = 0;
        await this.surveyRepository.save(newSurvey);
        return newSurvey;
    }
    async findAll() {
        const result = await this.surveyRepository
            .createQueryBuilder('survey')
            .leftJoinAndSelect('survey.question', 'question')
            .getMany();
        return result;
    }
    async findOne(id) {
        const survey = await this.surveyRepository.findOneBy({ id });
        if (!survey) {
            this.logger.error(new common_1.BadRequestException(`NOT FOUND SURVEY ID: ${id}`));
            throw new common_1.BadRequestException(`NOT FOUND SURVEY ID: ${id}`);
        }
        return survey;
    }
    async findDetail(id) {
        const result = await this.surveyRepository
            .createQueryBuilder('survey')
            .leftJoinAndSelect('survey.question', 'question')
            .leftJoinAndSelect('question.questionOption', 'questionOption')
            .where('survey.id= :id', { id: id })
            .getMany();
        if (!result) {
            this.logger.error(new common_1.BadRequestException(`NOT FOUND SURVEY ID: ${id}`));
            throw new common_1.BadRequestException(`NOT FOUND SURVEY ID: ${id}`);
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
        return this.dataSource.manager.remove(survey);
    }
};
SurveyService = SurveyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], SurveyService);
exports.SurveyService = SurveyService;
//# sourceMappingURL=survey.service.js.map
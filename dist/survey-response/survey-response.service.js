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
const typeorm_2 = require("typeorm");
const survey_response_entity_1 = require("./entities/survey-response.entity");
let SurveyResponseService = class SurveyResponseService {
    constructor(surveyResponseRepository) {
        this.surveyResponseRepository = surveyResponseRepository;
    }
    async create(createSurveyResponseInput) {
        const newSurveyResponse = this.surveyResponseRepository.create(createSurveyResponseInput);
        await this.surveyResponseRepository.save(newSurveyResponse);
        return newSurveyResponse;
    }
    async findAll() {
        const surveyResponse = await this.surveyResponseRepository.find();
        return surveyResponse;
    }
    async findOne(id) {
        const surveyResponse = await this.surveyResponseRepository.findOne({
            where: { id },
        });
        return surveyResponse;
    }
    update(id, updateSurveyResponseInput) {
        return `This action updates a #${id} surveyResponse`;
    }
    remove(id) {
        return `This action removes a #${id} surveyResponse`;
    }
};
SurveyResponseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_response_entity_1.SurveyResponse)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SurveyResponseService);
exports.SurveyResponseService = SurveyResponseService;
//# sourceMappingURL=survey-response.service.js.map
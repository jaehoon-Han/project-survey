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
exports.SurveyStatusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const survey_status_entity_1 = require("./entities/survey-status.entity");
let SurveyStatusService = class SurveyStatusService {
    constructor(surveyStatusRepository) {
        this.surveyStatusRepository = surveyStatusRepository;
    }
    async create(createSurveyStatusInput) {
        const newSurveyStatus = this.surveyStatusRepository.create(createSurveyStatusInput);
        await this.surveyStatusRepository.save(newSurveyStatus);
        return newSurveyStatus;
    }
    async findAll() {
        const surveystatus = await this.surveyStatusRepository.find();
        return surveystatus;
    }
    async findOne(id) {
        const surveystatus = await this.surveyStatusRepository.findOne({
            where: { id },
        });
        return surveystatus;
    }
    update(id, updateSurveyStatusInput) {
        return `This action updates a #${id} surveyStatus`;
    }
    remove(id) {
        return `This action removes a #${id} surveyStatus`;
    }
};
SurveyStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_status_entity_1.SurveyStatus)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SurveyStatusService);
exports.SurveyStatusService = SurveyStatusService;
//# sourceMappingURL=survey-status.service.js.map
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
exports.SurveyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const survey_service_1 = require("./survey.service");
const survey_entity_1 = require("./entities/survey.entity");
const create_survey_input_1 = require("./dto/create-survey.input");
const update_survey_input_1 = require("./dto/update-survey.input");
let SurveyResolver = class SurveyResolver {
    constructor(surveyService) {
        this.surveyService = surveyService;
    }
    create(input) {
        return this.surveyService.create(input);
    }
    async findAll() {
        const survey = this.surveyService.findAll();
        return survey;
    }
    findOne(id) {
        return this.surveyService.findOne(id);
    }
    findQuestionAndOptionOfSurvey(id) {
        return this.surveyService.findQuestionAndOptionOfSurvey(id);
    }
    update(updateSurveyInput) {
        return this.surveyService.update(updateSurveyInput.id, updateSurveyInput);
    }
    remove(id) {
        return this.surveyService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => survey_entity_1.Survey, { name: 'createSurvey' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_survey_input_1.CreateSurveyInput]),
    __metadata("design:returntype", void 0)
], SurveyResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)(() => [survey_entity_1.Survey], { name: 'findAllSurvey' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveyResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => survey_entity_1.Survey, { name: 'findOneSurvey' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveyResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => [survey_entity_1.Survey], { name: 'findDetailSurvey' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveyResolver.prototype, "findQuestionAndOptionOfSurvey", null);
__decorate([
    (0, graphql_1.Mutation)(() => survey_entity_1.Survey, { name: 'updateSurvey' }),
    __param(0, (0, graphql_1.Args)('updateSurveyInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_survey_input_1.UpdateSurveyInput]),
    __metadata("design:returntype", void 0)
], SurveyResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)(() => survey_entity_1.Survey, { name: 'removeSurvey' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveyResolver.prototype, "remove", null);
SurveyResolver = __decorate([
    (0, graphql_1.Resolver)(() => survey_entity_1.Survey),
    __metadata("design:paramtypes", [survey_service_1.SurveyService])
], SurveyResolver);
exports.SurveyResolver = SurveyResolver;
//# sourceMappingURL=survey.resolver.js.map
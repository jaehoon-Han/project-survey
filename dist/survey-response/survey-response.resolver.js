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
exports.SurveyResponseResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const survey_response_service_1 = require("./survey-response.service");
const survey_response_entity_1 = require("./entities/survey-response.entity");
const create_survey_response_input_1 = require("./dto/create-survey-response.input");
const update_survey_response_input_1 = require("./dto/update-survey-response.input");
let SurveyResponseResolver = class SurveyResponseResolver {
    constructor(surveyResponseService) {
        this.surveyResponseService = surveyResponseService;
    }
    createSurveyResponse(createSurveyResponseInput) {
        return this.surveyResponseService.create(createSurveyResponseInput);
    }
    findAll() {
        return this.surveyResponseService.findAll();
    }
    findOne(id) {
        return this.surveyResponseService.findOne(id);
    }
    findDetail(id) {
        return this.surveyResponseService.findDetail(id);
    }
    updateSurveyResponse(updateSurveyResponseInput) {
        return this.surveyResponseService.update(updateSurveyResponseInput.id, updateSurveyResponseInput);
    }
    updateCount(id) {
        return this.surveyResponseService.updateScore(id);
    }
    removeSurveyResponse(id) {
        return this.surveyResponseService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => survey_response_entity_1.SurveyResponse),
    __param(0, (0, graphql_1.Args)('createSurveyResponseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_survey_response_input_1.CreateSurveyResponseInput]),
    __metadata("design:returntype", void 0)
], SurveyResponseResolver.prototype, "createSurveyResponse", null);
__decorate([
    (0, graphql_1.Query)(() => [survey_response_entity_1.SurveyResponse], { name: 'surveyResponse' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveyResponseResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => survey_response_entity_1.SurveyResponse, { name: 'surveyResponse' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveyResponseResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => [survey_response_entity_1.SurveyResponse]),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveyResponseResolver.prototype, "findDetail", null);
__decorate([
    (0, graphql_1.Mutation)(() => survey_response_entity_1.SurveyResponse),
    __param(0, (0, graphql_1.Args)('updateSurveyResponseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_survey_response_input_1.UpdateSurveyResponseInput]),
    __metadata("design:returntype", void 0)
], SurveyResponseResolver.prototype, "updateSurveyResponse", null);
__decorate([
    (0, graphql_1.Mutation)(() => survey_response_entity_1.SurveyResponse),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveyResponseResolver.prototype, "updateCount", null);
__decorate([
    (0, graphql_1.Mutation)(() => survey_response_entity_1.SurveyResponse),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveyResponseResolver.prototype, "removeSurveyResponse", null);
SurveyResponseResolver = __decorate([
    (0, graphql_1.Resolver)(() => survey_response_entity_1.SurveyResponse),
    __metadata("design:paramtypes", [survey_response_service_1.SurveyResponseService])
], SurveyResponseResolver);
exports.SurveyResponseResolver = SurveyResponseResolver;
//# sourceMappingURL=survey-response.resolver.js.map
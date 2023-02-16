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
exports.SurveyStatusResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const survey_status_service_1 = require("./survey-status.service");
const survey_status_entity_1 = require("./entities/survey-status.entity");
const create_survey_status_input_1 = require("./dto/create-survey-status.input");
const update_survey_status_input_1 = require("./dto/update-survey-status.input");
let SurveyStatusResolver = class SurveyStatusResolver {
    constructor(surveyStatusService) {
        this.surveyStatusService = surveyStatusService;
    }
    createSurveyStatus(createSurveyStatusInput) {
        return this.surveyStatusService.create(createSurveyStatusInput);
    }
    findAll() {
        return this.surveyStatusService.findAll();
    }
    findOne(id) {
        return this.surveyStatusService.findOne(id);
    }
    updateSurveyStatus(updateSurveyStatusInput) {
        return this.surveyStatusService.update(updateSurveyStatusInput.id, updateSurveyStatusInput);
    }
    removeSurveyStatus(id) {
        return this.surveyStatusService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => survey_status_entity_1.SurveyStatus),
    __param(0, (0, graphql_1.Args)('createSurveyStatusInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_survey_status_input_1.CreateSurveyStatusInput]),
    __metadata("design:returntype", void 0)
], SurveyStatusResolver.prototype, "createSurveyStatus", null);
__decorate([
    (0, graphql_1.Query)(() => [survey_status_entity_1.SurveyStatus], { name: 'surveyStatus' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveyStatusResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => survey_status_entity_1.SurveyStatus, { name: 'surveyStatus' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveyStatusResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => survey_status_entity_1.SurveyStatus),
    __param(0, (0, graphql_1.Args)('updateSurveyStatusInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_survey_status_input_1.UpdateSurveyStatusInput]),
    __metadata("design:returntype", void 0)
], SurveyStatusResolver.prototype, "updateSurveyStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => survey_status_entity_1.SurveyStatus),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveyStatusResolver.prototype, "removeSurveyStatus", null);
SurveyStatusResolver = __decorate([
    (0, graphql_1.Resolver)(() => survey_status_entity_1.SurveyStatus),
    __metadata("design:paramtypes", [survey_status_service_1.SurveyStatusService])
], SurveyStatusResolver);
exports.SurveyStatusResolver = SurveyStatusResolver;
//# sourceMappingURL=survey-status.resolver.js.map
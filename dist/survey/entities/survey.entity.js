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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Survey = void 0;
const graphql_1 = require("@nestjs/graphql");
const commonentity_interface_1 = require("../../common/commonentity.interface");
const question_entity_1 = require("../../question/entities/question.entity");
const survey_response_entity_1 = require("../../survey-response/entities/survey-response.entity");
const typeorm_1 = require("typeorm");
let Survey = class Survey extends commonentity_interface_1.CommonEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'survey title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Survey.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'survey description' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Survey.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'question amount' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Survey.prototype, "amountQuestion", void 0);
__decorate([
    (0, graphql_1.Field)(() => [question_entity_1.Question], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (question) => question.survey, { eager: true }),
    __metadata("design:type", Array)
], Survey.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)(() => [survey_response_entity_1.SurveyResponse], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => survey_response_entity_1.SurveyResponse, (surveyResponse) => surveyResponse.survey, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Survey.prototype, "surveyResponse", void 0);
Survey = __decorate([
    (0, graphql_1.InputType)('SurveyInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Survey);
exports.Survey = Survey;
//# sourceMappingURL=survey.entity.js.map
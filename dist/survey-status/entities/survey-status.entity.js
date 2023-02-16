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
exports.SurveyStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const survey_entity_1 = require("../../survey/entities/survey.entity");
const typeorm_1 = require("typeorm");
let SurveyStatus = class SurveyStatus {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SurveyStatus.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SurveyStatus.prototype, "surveyId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SurveyStatus.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SurveyStatus.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SurveyStatus.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], SurveyStatus.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => survey_entity_1.Survey),
    (0, typeorm_1.ManyToOne)(() => survey_entity_1.Survey, (survey) => survey.surveyStatus),
    __metadata("design:type", survey_entity_1.Survey)
], SurveyStatus.prototype, "survey", void 0);
SurveyStatus = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], SurveyStatus);
exports.SurveyStatus = SurveyStatus;
//# sourceMappingURL=survey-status.entity.js.map
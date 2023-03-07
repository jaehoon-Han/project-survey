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
exports.Question = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const commonentity_interface_1 = require("../../common/entities/commonentity.interface");
const question_option_entity_1 = require("../../question-option/entities/question-option.entity");
const survey_entity_1 = require("../../survey/entities/survey.entity");
const typeorm_1 = require("typeorm");
let Question = class Question extends commonentity_interface_1.CommonEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(1, { message: 'Content is too short!' }),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => survey_entity_1.Survey, (survey) => survey.question, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => survey_entity_1.Survey),
    (0, typeorm_1.JoinColumn)({ name: 'surveyId' }),
    __metadata("design:type", survey_entity_1.Survey)
], Question.prototype, "survey", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Question.prototype, "surveyId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [question_option_entity_1.QuestionOption]),
    (0, typeorm_1.OneToMany)(() => question_option_entity_1.QuestionOption, (questionOption) => questionOption.question, { cascade: true }),
    __metadata("design:type", Array)
], Question.prototype, "questionOption", void 0);
Question = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Question);
exports.Question = Question;
//# sourceMappingURL=question.entity.js.map
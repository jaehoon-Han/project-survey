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
exports.QuestionOption = void 0;
const graphql_1 = require("@nestjs/graphql");
const answer_entity_1 = require("../../answer/entities/answer.entity");
const question_entity_1 = require("../../question/entities/question.entity");
const typeorm_1 = require("typeorm");
let QuestionOption = class QuestionOption {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuestionOption.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], QuestionOption.prototype, "questionId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionOption.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], QuestionOption.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionOption.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuestionOption.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], QuestionOption.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => question_entity_1.Question),
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, (question) => question.questionOption),
    __metadata("design:type", question_entity_1.Question)
], QuestionOption.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)(() => answer_entity_1.Answer),
    (0, typeorm_1.OneToMany)(() => answer_entity_1.Answer, (answer) => answer.questionOption, { eager: true }),
    __metadata("design:type", Array)
], QuestionOption.prototype, "answer", void 0);
QuestionOption = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], QuestionOption);
exports.QuestionOption = QuestionOption;
//# sourceMappingURL=question-option.entity.js.map
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
exports.QuestionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const question_service_1 = require("./question.service");
const question_entity_1 = require("./entities/question.entity");
const create_question_input_1 = require("./dto/create-question.input");
const update_question_input_1 = require("./dto/update-question.input");
let QuestionResolver = class QuestionResolver {
    constructor(questionService) {
        this.questionService = questionService;
    }
    createQuestion(createQuestionInput) {
        return this.questionService.create(createQuestionInput);
    }
    findAllQuestion() {
        return this.questionService.findAll();
    }
    findOne(id) {
        return this.questionService.findOne(id);
    }
    updateQuestion(updateQuestionInput) {
        return this.questionService.update(updateQuestionInput.id, updateQuestionInput);
    }
    removeQuestion(id) {
        return this.questionService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => question_entity_1.Question),
    __param(0, (0, graphql_1.Args)('createQuestionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_input_1.CreateQuestionInput]),
    __metadata("design:returntype", void 0)
], QuestionResolver.prototype, "createQuestion", null);
__decorate([
    (0, graphql_1.Query)(() => [question_entity_1.Question]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionResolver.prototype, "findAllQuestion", null);
__decorate([
    (0, graphql_1.Query)(() => question_entity_1.Question, { name: 'question' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => question_entity_1.Question),
    __param(0, (0, graphql_1.Args)('updateQuestionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_question_input_1.UpdateQuestionInput]),
    __metadata("design:returntype", void 0)
], QuestionResolver.prototype, "updateQuestion", null);
__decorate([
    (0, graphql_1.Mutation)(() => question_entity_1.Question),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionResolver.prototype, "removeQuestion", null);
QuestionResolver = __decorate([
    (0, graphql_1.Resolver)(() => question_entity_1.Question),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionResolver);
exports.QuestionResolver = QuestionResolver;
//# sourceMappingURL=question.resolver.js.map
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
exports.QuestionOptionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const question_option_service_1 = require("./question-option.service");
const question_option_entity_1 = require("./entities/question-option.entity");
const create_question_option_input_1 = require("./dto/create-question-option.input");
const update_question_option_input_1 = require("./dto/update-question-option.input");
let QuestionOptionResolver = class QuestionOptionResolver {
    constructor(questionOptionService) {
        this.questionOptionService = questionOptionService;
    }
    create(input) {
        return this.questionOptionService.create(input);
    }
    findAll() {
        return this.questionOptionService.findAll();
    }
    findOne(id) {
        return this.questionOptionService.findOne(id);
    }
    update(updateQuestionOptionInput) {
        return this.questionOptionService.update(updateQuestionOptionInput.id, updateQuestionOptionInput);
    }
    remove(id) {
        return this.questionOptionService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => question_option_entity_1.QuestionOption, { name: 'createQuestionOption' }),
    __param(0, (0, graphql_1.Args)('createQuestionOptionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_option_input_1.CreateQuestionOptionInput]),
    __metadata("design:returntype", void 0)
], QuestionOptionResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)(() => [question_option_entity_1.QuestionOption], { name: 'findAllQuestionOption' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionOptionResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => question_option_entity_1.QuestionOption, { name: 'findOneQuestionOption' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionOptionResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => question_option_entity_1.QuestionOption, { name: 'updateQuestionOption' }),
    __param(0, (0, graphql_1.Args)('updateQuestionOptionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_question_option_input_1.UpdateQuestionOptionInput]),
    __metadata("design:returntype", void 0)
], QuestionOptionResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)(() => question_option_entity_1.QuestionOption, { name: 'removeQuestionOption' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionOptionResolver.prototype, "remove", null);
QuestionOptionResolver = __decorate([
    (0, graphql_1.Resolver)(() => question_option_entity_1.QuestionOption),
    __metadata("design:paramtypes", [question_option_service_1.QuestionOptionService])
], QuestionOptionResolver);
exports.QuestionOptionResolver = QuestionOptionResolver;
//# sourceMappingURL=question-option.resolver.js.map
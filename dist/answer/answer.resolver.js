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
exports.AnswerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const answer_service_1 = require("./answer.service");
const answer_entity_1 = require("./entities/answer.entity");
const create_answer_input_1 = require("./dto/create-answer.input");
const update_answer_input_1 = require("./dto/update-answer.input");
let AnswerResolver = class AnswerResolver {
    constructor(answerService) {
        this.answerService = answerService;
    }
    createAnswer(createAnswerInput, questionOptionid) {
        return this.answerService.create(createAnswerInput, questionOptionid);
    }
    findAll() {
        return this.answerService.findAll();
    }
    findOne(id) {
        return this.answerService.findOne(id);
    }
    updateAnswer(updateAnswerInput) {
        return this.answerService.update(updateAnswerInput.id, updateAnswerInput);
    }
    removeAnswer(id) {
        return this.answerService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => answer_entity_1.Answer),
    __param(0, (0, graphql_1.Args)('createAnswerInput')),
    __param(1, (0, graphql_1.Args)('questionOptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_answer_input_1.CreateAnswerInput, Number]),
    __metadata("design:returntype", void 0)
], AnswerResolver.prototype, "createAnswer", null);
__decorate([
    (0, graphql_1.Query)(() => [answer_entity_1.Answer], { name: 'findAllAnswer' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnswerResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => answer_entity_1.Answer, { name: 'findOneAnswer' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => answer_entity_1.Answer),
    __param(0, (0, graphql_1.Args)('updateAnswerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_answer_input_1.UpdateAnswerInput]),
    __metadata("design:returntype", void 0)
], AnswerResolver.prototype, "updateAnswer", null);
__decorate([
    (0, graphql_1.Mutation)(() => answer_entity_1.Answer),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerResolver.prototype, "removeAnswer", null);
AnswerResolver = __decorate([
    (0, graphql_1.Resolver)(() => answer_entity_1.Answer),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerResolver);
exports.AnswerResolver = AnswerResolver;
//# sourceMappingURL=answer.resolver.js.map
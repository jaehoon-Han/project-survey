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
exports.QuestionOptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("../question/entities/question.entity");
const typeorm_2 = require("typeorm");
const question_option_entity_1 = require("./entities/question-option.entity");
let QuestionOptionService = class QuestionOptionService {
    constructor(questionOptionRepository, entityManager, dataSource) {
        this.questionOptionRepository = questionOptionRepository;
        this.entityManager = entityManager;
        this.dataSource = dataSource;
    }
    async create(createQuestionOptionInput) {
        const newQuestionOption = this.questionOptionRepository.create(createQuestionOptionInput);
        newQuestionOption.question = await this.entityManager.findOneById(question_entity_1.Question, createQuestionOptionInput.questionId);
        return this.entityManager.save(newQuestionOption);
    }
    async findAll() {
        const questionOption = await this.questionOptionRepository.find();
        return questionOption;
    }
    async findOne(id) {
        const questionOption = await this.questionOptionRepository.findOneBy({
            id,
        });
        return questionOption;
    }
    async update(id, updateQuestionOptionInput) {
        const questionOption = await this.findOne(id);
        this.questionOptionRepository.merge(questionOption, updateQuestionOptionInput);
        return this.questionOptionRepository.update(id, questionOption);
    }
    remove(id) {
        return `This action removes a #${id} questionOption`;
    }
};
QuestionOptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_option_entity_1.QuestionOption)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource])
], QuestionOptionService);
exports.QuestionOptionService = QuestionOptionService;
//# sourceMappingURL=question-option.service.js.map
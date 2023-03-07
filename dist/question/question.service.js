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
var QuestionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_entity_1 = require("../survey/entities/survey.entity");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("./entities/question.entity");
let QuestionService = QuestionService_1 = class QuestionService {
    constructor(questionRepository, entityManager) {
        this.questionRepository = questionRepository;
        this.entityManager = entityManager;
        this.logger = new common_1.Logger(QuestionService_1.name);
    }
    async create(createQuestionInput) {
        const newQuestion = this.questionRepository.create(createQuestionInput);
        const survey = await this.validSurvey(createQuestionInput.surveyId);
        newQuestion.survey = survey;
        survey.amountQuestion = survey.amountQuestion + 1;
        this.entityManager.update(survey_entity_1.Survey, createQuestionInput.surveyId, survey);
        return this.entityManager.save(newQuestion);
    }
    async findAll() {
        const result = await this.questionRepository
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.questionOption', 'questionOption')
            .innerJoinAndSelect('question.survey', 'survey')
            .getMany();
        return result;
    }
    async findOne(id) {
        return this.validQuestion(id);
    }
    async findDetail(id) {
        const result = await this.questionRepository
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.questionOption', 'questionOption')
            .innerJoinAndSelect('question.survey', 'survey')
            .where('question.id= :id', { id: id })
            .getMany();
        return result;
    }
    async update(id, updateQuestionInput) {
        const question = await this.findOne(id);
        this.questionRepository.merge(question, updateQuestionInput);
        return this.questionRepository.update(id, question);
    }
    async remove(id) {
        const question = await this.findOne(id);
        return this.entityManager.remove(question);
    }
    async validQuestion(id) {
        const question = await this.questionRepository.findOneBy({ id });
        if (!question) {
            throw new Error(`CAN NOT FIND QUESTION! ID: ${id}`);
        }
        return question;
    }
    async validSurvey(surveyId) {
        const survey = await this.entityManager.findOneBy(survey_entity_1.Survey, {
            id: surveyId,
        });
        if (!survey) {
            throw new Error(`CAN NOT FIND THE SURVEY! ID: ${surveyId}`);
        }
        else {
            return survey;
        }
    }
};
QuestionService = QuestionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map
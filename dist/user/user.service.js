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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_response_entity_1 = require("../survey-response/entities/survey-response.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository, entityManager) {
        this.userRepository = userRepository;
        this.entityManager = entityManager;
    }
    async create(createUserInput) {
        const newUser = this.userRepository.create(createUserInput);
        return await this.userRepository.save(newUser);
    }
    async findAll() {
        return this.userRepository.find();
    }
    async findOne(id) {
        return this.validUser(id);
    }
    async getUserWithResponse(id) {
        const result = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.surveyResponse', 'surveyResponse')
            .where('user.id= :id', { id: id })
            .getOne();
        return result;
    }
    async update(id, updateUserInput) {
        const user = await this.findOne(id);
        this.userRepository.merge(user, updateUserInput);
        return this.userRepository.update(id, user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        return this.entityManager.remove(user);
    }
    async removeSurveyResponse(id) {
        return await this.entityManager.delete(survey_response_entity_1.SurveyResponse, { userId: id });
    }
    async validUser(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`CAN NOT FIND USER! ID: ${id}`);
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
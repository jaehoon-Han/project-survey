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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_response_entity_1 = require("../survey-response/entities/survey-response.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = UserService_1 = class UserService {
    constructor(userRepository, dataSource) {
        this.userRepository = userRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async create(createUserInput) {
        const newUser = this.userRepository.create(createUserInput);
        return await this.userRepository.save(newUser);
    }
    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }
    async getUserWithResponse(id) {
        const result = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.surveyResponse', 'surveyResponse')
            .where('user.id= :id', { id: id })
            .getMany();
        return result;
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({
            id,
        });
        if (!user) {
            this.logger.error(new common_1.BadRequestException(`NOT FOUND USER ID: ${id}`));
            throw new common_1.BadRequestException(`NOT FOUND USER ID: ${id}`);
        }
        return user;
    }
    async update(id, updateUserInput) {
        const user = await this.findOne(id);
        this.userRepository.merge(user, updateUserInput);
        return this.userRepository.update(id, user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        return this.dataSource.manager.remove(user);
    }
    async removeSurveyResponse(id) {
        return await this.dataSource.manager.delete(survey_response_entity_1.SurveyResponse, { userId: id });
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
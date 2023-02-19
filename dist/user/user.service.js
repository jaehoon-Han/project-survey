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
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository, dataSource) {
        this.userRepository = userRepository;
        this.dataSource = dataSource;
    }
    async create(createUserInput) {
        const newUser = this.userRepository.create(createUserInput);
        await this.userRepository.save(newUser);
        return newUser;
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
        const user = await this.userRepository.findOne({
            where: { id },
        });
        return user;
    }
    update(id, updateUserInput) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
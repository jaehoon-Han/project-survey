"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionOptionModule = void 0;
const common_1 = require("@nestjs/common");
const question_option_service_1 = require("./question-option.service");
const question_option_resolver_1 = require("./question-option.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const question_option_entity_1 = require("./entities/question-option.entity");
let QuestionOptionModule = class QuestionOptionModule {
};
QuestionOptionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([question_option_entity_1.QuestionOption])],
        providers: [question_option_resolver_1.QuestionOptionResolver, question_option_service_1.QuestionOptionService],
    })
], QuestionOptionModule);
exports.QuestionOptionModule = QuestionOptionModule;
//# sourceMappingURL=question-option.module.js.map
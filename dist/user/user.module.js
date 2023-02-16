"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_resolver_1 = require("./user.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const survey_response_entity_1 = require("../survey-response/entities/survey-response.entity");
const survey_response_service_1 = require("../survey-response/survey-response.service");
const answer_entity_1 = require("../answer/entities/answer.entity");
const answer_service_1 = require("../answer/answer.service");
const question_option_entity_1 = require("../question-option/entities/question-option.entity");
const question_option_service_1 = require("../question-option/question-option.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([survey_response_entity_1.SurveyResponse]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([answer_entity_1.Answer]),
            typeorm_1.TypeOrmModule.forFeature([question_option_entity_1.QuestionOption]),
        ],
        providers: [
            user_resolver_1.UserResolver,
            user_service_1.UserService,
            survey_response_service_1.SurveyResponseService,
            answer_service_1.AnswerService,
            question_option_service_1.QuestionOptionService,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map
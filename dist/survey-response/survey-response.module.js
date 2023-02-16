"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyResponseModule = void 0;
const common_1 = require("@nestjs/common");
const survey_response_service_1 = require("./survey-response.service");
const survey_response_resolver_1 = require("./survey-response.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const survey_response_entity_1 = require("./entities/survey-response.entity");
const answer_entity_1 = require("../answer/entities/answer.entity");
const answer_service_1 = require("../answer/answer.service");
const question_option_entity_1 = require("../question-option/entities/question-option.entity");
const question_option_service_1 = require("../question-option/question-option.service");
let SurveyResponseModule = class SurveyResponseModule {
};
SurveyResponseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([answer_entity_1.Answer]),
            typeorm_1.TypeOrmModule.forFeature([survey_response_entity_1.SurveyResponse]),
            typeorm_1.TypeOrmModule.forFeature([question_option_entity_1.QuestionOption]),
        ],
        providers: [
            survey_response_resolver_1.SurveyResponseResolver,
            survey_response_service_1.SurveyResponseService,
            answer_service_1.AnswerService,
            question_option_service_1.QuestionOptionService,
        ],
    })
], SurveyResponseModule);
exports.SurveyResponseModule = SurveyResponseModule;
//# sourceMappingURL=survey-response.module.js.map
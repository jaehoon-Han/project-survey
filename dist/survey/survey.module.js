"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModule = void 0;
const common_1 = require("@nestjs/common");
const survey_service_1 = require("./survey.service");
const survey_resolver_1 = require("./survey.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const survey_entity_1 = require("./entities/survey.entity");
const question_entity_1 = require("../question/entities/question.entity");
const survey_status_entity_1 = require("../survey-status/entities/survey-status.entity");
const question_service_1 = require("../question/question.service");
const survey_status_service_1 = require("../survey-status/survey-status.service");
let SurveyModule = class SurveyModule {
};
SurveyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([survey_entity_1.Survey]),
            typeorm_1.TypeOrmModule.forFeature([question_entity_1.Question]),
            typeorm_1.TypeOrmModule.forFeature([survey_status_entity_1.SurveyStatus]),
        ],
        exports: [survey_service_1.SurveyService],
        providers: [
            survey_resolver_1.SurveyResolver,
            survey_service_1.SurveyService,
            question_service_1.QuestionService,
            survey_status_service_1.SurveyStatusService,
        ],
    })
], SurveyModule);
exports.SurveyModule = SurveyModule;
//# sourceMappingURL=survey.module.js.map
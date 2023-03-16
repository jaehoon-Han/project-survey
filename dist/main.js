"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./common/logger/logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useLogger(new logger_service_1.MyLogger());
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map
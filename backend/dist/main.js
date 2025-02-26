"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const bodyParser = require("body-parser");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('REST ENDPOINTS - Superlabs')
        .setDescription('API documentation')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        description: 'Enter your Bearer token',
    }, 'JWT')
        .addSecurityRequirements('bearer')
        .build();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('documentation', app, document, {});
    app.useLogger(new common_1.Logger());
    app.use((0, helmet_1.default)());
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('port');
    await app.listen(port, () => {
        console.log(`Application is running on: http://localhost:${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
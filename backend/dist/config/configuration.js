"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return {
        app_name: process.env.APP_NAME,
        app_env: process.env.NODE_ENV,
        host: process.env.HOST,
        port: parseInt(process.env.PORT, 10) || 3000,
        web_host: process.env.WEB_HOST,
        database: process.env.DB_HOST,
    };
};
//# sourceMappingURL=configuration.js.map
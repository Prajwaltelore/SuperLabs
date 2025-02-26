export default () => {
    return {
        app_name: process.env.APP_NAME,
        app_env: process.env.NODE_ENV,

        // Service Configuration
        host: process.env.HOST,
        port: parseInt(process.env.PORT, 10) || 3000,
        // Website Configurations
        web_host: process.env.WEB_HOST,
        // Database Configurations
        database: process.env.DB_HOST, 

    };
};

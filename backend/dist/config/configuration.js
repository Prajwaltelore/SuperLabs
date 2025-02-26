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
        jwt_secret: process.env.JWT_SECRET,
        jwt_expiry: process.env.JWT_EXPIRY,
        refresh_secret: process.env.REFRESH_SECRET,
        jwt_refresh_expiry: process.env.JWT_REFRESH_EXPIRY,
        mailgun_api_key: process.env.MAILGUN_API_KEY,
        mailgun_domain: process.env.MAILGUN_DOMAIN,
        mailgun_username: process.env.MAILGUN_USERNAME,
        mailgun_host: process.env.MAILGUN_HOST,
        mailgun_from_email: process.env.FROM_EMAIL,
        two_factor_api_key: process.env.TWO_FACTOR_API_KEY,
        contabo_access_key: process.env.CONTABO_ACCESS_KEY,
        contabo_secret_key: process.env.CONTABO_SECRET_KEY,
        contabo_endpoint: process.env.CONTABO_ENDPOINT,
        contabo_region: process.env.CONTABO_REGION,
        contabo_bucket_name: process.env.CONTABO_BUCKET_NAME,
        storage_link: process.env.SPACES_STORAGE_LINK,
        spaces_access_key: process.env.SPACES_ACCESS_KEY,
        spaces_secret_key: process.env.SPACES_SECRET_KEY,
        spaces_endpoint: process.env.SPACES_ENDPOINT,
        spaces_region: process.env.SPACES_REGION,
        spaces_bucket: process.env.SPACES_BUCKET,
        facebook_client_id: process.env.FACEBOOK_CLIENT_ID,
        facebook_client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        google_client_id: process.env.GOOGLE_CLIENT_ID,
        google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
        google_callback_url: process.env.GOOGLE_CALLBACK_URL
    };
};
//# sourceMappingURL=configuration.js.map
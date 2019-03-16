import { load as dotenvLoad } from 'dotenv'

export default function generateConfig(path = '.env') {    
    dotenvLoad({ path })

    const env = process.env

    return {
        env: env.NODE_ENV,
        host: env.HOST,
        port: env.PORT,
        salt: env.SALT,
        supportEmail: env.SUPPORT_EMAIL,
        postgres: {
            uri: env.DATABASE_URL,
            maxIdleTime: +(env.DATABASE_MAX_IDLE_TIME || 0),
            maxPoolSize: +env.DATABASE_MAX_POOL_SIZE || 100,
        },
        mailer: {
            SENDGRID_API_KEY: env.SENDGRID_API_KEY,
            SENDGRID_DOMAIN: env.SENDGRID_DOMAIN,
        },
        auth: {
            accessTokenLifetime: env.AUTH_ACCESS_TOKEN_LIFETIME,
            refreshTokenLifetime: env.AUTH_REFRESH_TOKEN_LIFETIME,
            resetEmailTokenLifetime: env.AUTH_RESET_EMAIL_TOKEN_LIFETIME,
        },
        app: {
            domain: env.DOMAIN || 'localhost',
        },
        cloud: {
            name: env.CLOUDINARY_CLOUD_NAME,
            apiKey: env.CLOUDINARY_API_KEY,
            apiSecret: env.CLOUDINARY_API_SECRET,
        },
    }
}

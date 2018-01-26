import { load as dotenvLoad } from 'dotenv'

export default function generateConfig(path = '.env') {
  
    const env = dotenvLoad({ path }).parsed || process.env

    return {
        env: env.ENV,
        port: env.PORT,
        salt: env.SALT,
        postgres: {
            uri: env.DATABASE_URL,
            maxIdleTime: +(env.DATABASE_MAX_IDLE_TIME || 0),
            maxPoolSize: +env.DATABASE_MAX_POOL_SIZE || 100,
        },
        mailer: {
            SENDGRID_API_KEY: env.SENDGRID_API_KEY,
            SENDGRID_FROM: env.SENDGRID_FROM,
        }
    }
}

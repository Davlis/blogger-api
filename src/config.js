import { load as dotenvLoad } from 'dotenv'

export default function generateConfig() {
    const env = dotenvLoad({ path: '.env' }).parsed || process.env

    return {
        env: env.ENV,
        port: env.PORT,
        salt: env.SALT,
        rootEmail: env.ROOT_EMAIL,
        rootPassword: env.ROOT_PASSWORD,
    }
}
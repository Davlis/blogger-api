import generateConfig from '../../config'
import initSequelizeFromConfig from '../../database'

const engineTimeInterval = process.env.TAGGING_INTERVAL || 24*60*60*1000

const config = generateConfig('../../../.env')
const { sequelize, models } = initSequelizeFromConfig(config)

process.on('unhandledRejection', console.error)

handler().catch(err => console.log(err))

async function handler() {
    setInterval(start, engineTimeInterval)
}

async function start() {
}

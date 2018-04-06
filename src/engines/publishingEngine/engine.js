import generateConfig from '../../config'
import initSequelizeFromConfig from '../../database'

process.on('unhandledRejection', console.error)

const engineTimeInterval = process.env.PUBLISHING_INTERVAL || 60*1000

handler().catch(err => console.log(err))

async function handler() {

    const config = generateConfig('../../../.env')

    const { sequelize, models } = initSequelizeFromConfig(config)

    startInterval(engineTimeInterval, () => start(sequelize, models))
}

async function start(sequelize, models) {
    const { Post } = models

    const unpublishedPosts = await Post.find({
        where: {
            publishDate: {
                $lte: new Date(), 
            },
            hidden: true,
        }
    })

    console.log(unpublishedPosts.length)
}

function startInterval(seconds, callback) {
    callback()
    return setInterval(callback, seconds * 1000)
}

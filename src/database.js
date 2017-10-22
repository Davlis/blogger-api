import Sequelize from 'sequelize'
import generateConfig from './config'
import defineUser from './models/user'
import defineBlog from './models/blog'
import definePost from './models/post'

export default function initSequelizeFromConfig(config) {

    const sequelize = new Sequelize(config.postgres.uri, {
        dialect: 'postgres',
    })
    
    const models = {
        User: defineUser(sequelize),
        Blog: defineBlog(sequelize),
        Post: definePost(sequelize),
    }

    Object.keys(models).forEach((name) => {
        if ('associate' in models[name]) {
            models[name].associate(models)
        }
    })

    return { sequelize, models }
}
import Sequelize from 'sequelize'
import defineUser from './models/user'
import defineBlog from './models/blog'
import definePost from './models/post'
import defineUserBlog from './models/user-blog'
import defineBlogComment from './models/blog-comment'
import definePostComment from './models/post-comment'
import defineReport from './models/report'
import defineNotification from './models/notification'
import defineSubscription from './models/subscription'
import defineUserUpload from './models/user-upload'

export default function initSequelizeFromConfig(config) {
    const sequelize = new Sequelize(config.postgres.uri, {
        dialect: 'postgres',
    })
    
    const models = {
        User: defineUser(sequelize),
        Blog: defineBlog(sequelize),
        Post: definePost(sequelize),
        UserBlog: defineUserBlog(sequelize),
        BlogComment: defineBlogComment(sequelize),
        PostComment: definePostComment(sequelize),
        Report: defineReport(sequelize),
        Notification: defineNotification(sequelize),
        Subscription: defineSubscription(sequelize),
        UserUpload: defineUserUpload(sequelize),
    }

    Object.keys(models).forEach((name) => {
        if ('associate' in models[name]) {
            models[name].associate(models)
        }
    })

    return { sequelize, models }
}

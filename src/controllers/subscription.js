import { assertOrThrow, pick } from '../utils'
import { NotFound } from '../errors';

export async function subscribe(req, res) {
    const { Subscription, Blog } = req.app.get('models')
    const { user } = res.locals

    const input = pick(req.body, 'blogId')

    const blog = await Blog.findById(input.blogId)

    assertOrThrow(blog, NotFound, 'Blog not found')

    const subscription = await Subscription.create({
        userId: user.id,
        blogId: input.blogId,
    })

    res.json(subscription)
}

export async function getSubscriptions(req, res) {
    const { Subscription } = req.app.get('models')
    const { user } = res.locals

    const subscriptions = await Subscription.findAll({
        where: {
            userId: user.id,
        }
    })

    res.json(subscriptions)
}

export async function deleteSubscription(req, res) {
    const { Subscription } = req.app.get('models')
    const { subscriptionId } = req.params

    const subscription = await Subscription.findById(subscriptionId)

    assertOrThrow(subscription, NotFound, 'Subscription not found')

    await subscription.destroy()

    res.json({status: 'ok'})
}

export async function getPostsFromMyList(req, res) {

    const sequelize = req.app.get('sequelize')
    const Op = sequelize.Op;
    const { Subscription, Post } = req.app.get('models')
    const { offset = 0, limit = 20  } = req.params
    const { user } = res.locals

    const subscriptions = await Subscription.findAll({
        where: {
            userId: user.id,
        }
    })

    const blogIds = subscriptions.map(s => s.blogId)

    const posts = await Post.findAndCountAll({
        where: {
            blogId: {
                [Op.or]: blogIds
            }
        },
        order: [['publishDate', 'DESC']],
        limit,
        offset,
    })

    res.json(posts)
}

export async function getMyBlogList(req, res) {
    const { User, Blog, Subscription } = req.app.get('models')
    const { offset = 0, limit = 20  } = req.params

    const { user } = res.locals

    const result = await Subscription.findAndCountAll({
        where: {
            userId: user.id,
        },
        include: [{
            model: Blog,
            include: [{
                model: User,
            }]
        }],
        limit,
        offset,
    })

    res.json(result)
}

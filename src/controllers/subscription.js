import { assertOrThrow, pick } from '../utils'

export async function subscribe(req, res) {
    const { Subscription, Blog } = req.app.get('models')
    const { user } = res.locals

    const input = pick(req.body, 'blogId')

    const blog = await Blog.findById(input.blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    const subscription = await Subscription.create({
        userId: user.id,
        blogId: input.blogId,
    })

    res.json(subscription)
}

export async function getSubscriptions(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}

export async function deleteSubscription(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}
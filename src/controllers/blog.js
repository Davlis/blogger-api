import { assertOrThrow, pick } from '../utils'

export async function createBlog(req, res) {
    const { Blog, User } = req.app.get('models')
    const { user } = res.locals

    const input = pick(req.body, 'title')

    res.send('Not implemented')
}
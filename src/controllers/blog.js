import { assertOrThrow, pick } from '../utils'

export async function createBlog(req, res) {
    const input = pick(req.body, 'title')
    const { Blog, User } = req.app.get('models')

    console.log(res.locals.user)

    res.send('ok')
}
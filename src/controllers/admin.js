import { assertOrThrow, pick } from '../utils'

export async function blockUser(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}

export async function deleteUserBlog(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}

export async function deleteUserPost(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}

export async function deleteUserComment(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}

export async function getUsers(req, res) {
    const { User } = req.app.get('models')
    const { offset = 0, limit = 20 } = req.query

    const users = await User.findAndCountAll({
        offset,
        limit,
    })

    res.json({ users })
}

export async function getBlogs(req, res) {
    const { Blog } = req.app.get('models')
    const { offset = 0, limit = 20 } = req.query

    const blogs = await Blog.findAndCountAll({
        offset,
        limit,
    })

    res.json({ blogs })
}

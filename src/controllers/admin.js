import { assertOrThrow, pick } from '../utils'

export async function blockUser(req, res) {
    const { User } = req.app.get('models')
    const { userId } = req.params

    const user = await User.findById(userId)

    assertOrThrow(user, Error, 'User not found')

    user.status = User.USER_STATUS.BLOCKED
    await user.save()
    
    res.json({ user })
}

export async function unblockUser(req, res) {
    const { User } = req.app.get('models')
    const { userId } = req.params

    const user = await User.findById(userId)

    assertOrThrow(user, Error, 'User not found')

    user.status = User.USER_STATUS.ACTIVE
    await user.save()
    
    res.json({ user })
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

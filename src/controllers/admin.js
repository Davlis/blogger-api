import { assertOrThrow } from '../utils'
import { NotFound } from '../errors'

export async function blockUser(req, res) {

    const { User } = req.app.get('models')
    const { userId } = req.params

    const user = await User.findById(userId)

    assertOrThrow(user, NotFound, 'User not found')

    user.status = User.USER_STATUS.BLOCKED
    await user.save()
    
    res.json(user)
}

export async function unblockUser(req, res) {
    
    const { User } = req.app.get('models')
    const { userId } = req.params

    const user = await User.findById(userId)

    assertOrThrow(user, NotFound, 'User not found')

    user.status = User.USER_STATUS.ACTIVE
    await user.save()

    res.json(user)
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

    res.json(users)
}

export async function getBlogs(req, res) {
    const { Blog } = req.app.get('models')
    const { offset = 0, limit = 20 } = req.query

    const blogs = await Blog.findAndCountAll({
        offset,
        limit,
    })

    res.json(blogs)
}

export async function deleteBlog(req, res) {
    const { Blog } = req.app.get('models')
    const { id } = req.params

    const blog = await Blog.findById(id)

    assertOrThrow(blog, NotFound, 'Blog not found')

    await blog.destroy()

    res.json({ status: 'ok' })
}

export async function deletePost(req, res) {
    const { Post } = req.app.get('models')
    const { id } = req.params

    const post = await Post.findById(id)

    assertOrThrow(post, NotFound, 'Post not found')

    await post.destroy()

    res.json({ status: 'ok' })
}

import { assertOrThrow, pick } from '../utils'

export async function createBlog(req, res) {

    const sequelize = req.app.get('sequelize')
    const { Blog, UserBlog } = req.app.get('models')
    const { user } = res.locals

    const input = pick(req.body, 'title')

    const transaction = await sequelize.transaction()

    const blog = await Blog.create({
        title: input.title,
        owner: user.id,
    }, { transaction })

    await UserBlog.create({
        userId: user.id,
        blogId: blog.id,
    }, { transaction })

    await transaction.commit()

    res.send(blog)
}

export async function getUserBlogs(req, res) {
    
    const { UserBlog, Blog } = req.app.get('models')
    const { user } = res.locals

    const blogs = await UserBlog.findAll({
        userId: user.id,
        include: [Blog,],
        attributes: ['blogId',]
    })

    res.send(blogs)
}

export async function getBlog(req, res) {
    const { Blog, User } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    res.send(blog)
}

export async function updateBlog(req, res) {
    const { Blog, User } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const input = pick(req.body, 'title')

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    await blog.update(input)

    res.send(blog)
}

export async function deleteBlog(req, res) {
    const { Blog, User } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const input = pick(req.body, 'title')

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    await blog.destroy()

    res.send('ok')
}

export async function grantAccess(req, res) {
    const { UserBlog, Blog } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const newUser = req.body.userId

    const userBlog = await UserBlog.find({
        where: {
            blogId,
        },
        include: [{
            model: Blog,
            where: {
                owner: user.id,
            }
        }]
    })

    assertOrThrow(userBlog, Error, 'Blog not found')

    await UserBlog.create({
        blogId,
        userId: newUser,
    })

    res.send(userBlog)
}

export async function revokeAccess(req, res) {
    const { UserBlog, Blog } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const revokeUser = req.body.userId

    const userBlog = await UserBlog.find({
        where: {
            blogId,
            userId: revokeUser,
        },
        include: [{
            model: Blog,
            where: {
                owner: user.id,
            }
        }]
    })

    assertOrThrow(userBlog, Error, 'UserBlog not found')

    await userBlog.destroy()

    res.send('ok')
}

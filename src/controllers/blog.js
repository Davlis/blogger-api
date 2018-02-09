import { assertOrThrow, pick } from '../utils'

export async function createBlog(req, res) {

    const sequelize = req.app.get('sequelize')
    const { Blog, UserBlog } = req.app.get('models')
    const { user } = res.locals

    const input = pick(req.body, 'title subtitle photoUrl')

    const transaction = await sequelize.transaction()

    const blog = await Blog.create({
        title: input.title,
        subtitle: input.subtitle,
        photoUrl: input.photoUrl,
        owner: user.id,
    }, { transaction })

    await UserBlog.create({
        userId: user.id,
        blogId: blog.id,
    }, { transaction })

    await transaction.commit()

    res.json(blog)
}

export async function getUserBlogs(req, res) {
    
    const { UserBlog, Blog } = req.app.get('models')
    const { user } = res.locals

    const blogs = await UserBlog.findAll({
        where: {
            userId: user.id,
        },
        include: [{all: true}],
    })

    res.json(blogs)
}

export async function getBlog(req, res) {
    
    const { Blog, UserBlog } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params

    const blog = await Blog.findById(blogId, {
        include: [{all: true}]
    })

    assertOrThrow(blog, Error, 'Blog not found')

    const userBlog = await UserBlog.find({
        where: {
            userId: user.id,
        },
    })

    const _blog = blog.toJSON()

    _blog.isAuthor = !!userBlog

    _blog.isOwner = blog.owner === user.id

    res.json(_blog)
}

export async function updateBlog(req, res) {

    const { Blog } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const input = pick(req.body, 'title subtitle photoUrl')

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    await blog.update(input)

    res.json(blog)
}

export async function deleteBlog(req, res) {

    const { Blog } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const input = pick(req.body, 'title')

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    await blog.destroy()

    res.json({ status: 'ok' })
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

    res.json(userBlog)
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

    res.json({ status: 'ok' })
}

export async function addComment(req, res) {

    const { BlogComment, Blog } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const body = req.body

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    const blogComment = await BlogComment.create({
        content: body.content,
        blogId,
        owner: user.id,
    })

    res.json(blogComment)
}

export async function getComments(req, res) {

    const { BlogComment, Blog } = req.app.get('models')
    const { offset = 0, limit = 20 } = req.query
    const { blogId } = req.params
    const body = req.body

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    const blogComments = await BlogComment.findAndCountAll({
        where: {
            blogId: blogId,
        },
        include: [{all: true}],
        limit,
        offset,
    })

    res.json(blogComments)
}

export async function removeComment(req, res) {

    const { BlogComment, Blog } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const { commentId } = req.params

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    const blogComment = await BlogComment.findById(commentId)

    assertOrThrow(blogComment, Error, 'Blog comment not found')

    await blogComment.destroy()

    res.json({ status: 'ok' })
}

export async function updateComment(req, res) {

    const { BlogComment, Blog } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const { commentId } = req.params
    const body = req.body

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    let blogComment = await BlogComment.findById(commentId)

    assertOrThrow(blogComment, Error, 'Blog comment not found')

    blogComment = await blogComment.update({
        content: body.content,
        blogId,
        owner: user.id,
    })

    res.json(blogComment)
}

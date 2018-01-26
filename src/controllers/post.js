import { assertOrThrow, pick } from '../utils'

export async function createPost(req, res) {

    const { Blog, Post } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    // TODO(dliszka): Add roles to user-blog. (owner of blog, shared)
    // assertOrThrow(blog.userId === user.id, Error, 'Forbidden')

    const input = pick(req.body, 'content publishDate')

    const post = await Post.create({
        content: input.content,
        publishDate: input.publishDate,
        blogId,
    })

    res.send(post)
}

export async function getPost(req, res) {

    const { Post } = req.app.get('models')
    const { postId } = req.params

    const post = await Post.findById(postId)

    res.send(post)
}

export async function updatePost(req, res) {

    const { Post } = req.app.get('models')
    const { postId } = req.params

    const post = await Post.findById(postId)

    assertOrThrow(post, Error, 'Post not found')

    await post.update(req.body)
}

export async function deletePost(req, res) {

    const { Post } = req.app.get('models')
    const { postId } = req.params

    const post = await Post.findById(postId)

    assertOrThrow(post, Error, 'Post not found')

    await post.destroy()

    res.send('ok')
}

export async function getBlogPosts(req, res) {
    
    const { User, Blog, Post } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params
    const input = pick(req.body, 'title')

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    const posts = await Post.findAll({
        where: {
            blogId,
        }
    })

    res.send(posts)
}
import { assertOrThrow, pick } from '../utils'
import { normalizeWords } from '../lib/tfidf'

export async function createPost(req, res) {

    const { Blog, Post } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, Error, 'Blog not found')

    // TODO(dliszka): Add roles to user-blog. (owner of blog, shared)
    // assertOrThrow(blog.userId === user.id, Error, 'Forbidden')

    const input = pick(req.body, 'title content publishDate tags')

    const post = await Post.create({
        title: input.title,
        content: input.content,
        tags: normalizeWords(input.tags),
        publishDate: input.publishDate,
        blogId,
    })

    res.json(post)
}

export async function getPost(req, res) {

    const { Post } = req.app.get('models')
    const { postId } = req.params

    const post = await Post.findById(postId)

    res.json(post)
}

export async function updatePost(req, res) {

    const { Post } = req.app.get('models')
    const { postId } = req.params
    const body = req.body

    const post = await Post.findById(postId)

    assertOrThrow(post, Error, 'Post not found')

    body.tags = normalizeWords(body.tags)

    await post.update(body)

    res.json(post)
}

export async function deletePost(req, res) {

    const { Post } = req.app.get('models')
    const { postId } = req.params

    const post = await Post.findById(postId)

    assertOrThrow(post, Error, 'Post not found')

    await post.destroy()

    res.json({ status: 'ok' })
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

    res.json(posts)
}

export async function getComments(req, res) {
    const { PostComment, Post } = req.app.get('models')
    const { offset = 0, limit = 20 } = req.query
    const { postId } = req.params

    const post = await Post.findById(postId)

    assertOrThrow(post, Error, 'Post not found')

    const postComments = await PostComment.findAndCountAll({
        where: {
            postId: postId,
        },
        include: [{all: true}],
        limit,
        offset,
    })

    res.json(postComments)
}

export async function addComment(req, res) {
    const { PostComment, Post } = req.app.get('models')
    const { user } = res.locals
    const { postId } = req.params
    const body = req.body

    const post = await Post.findById(postId)

    assertOrThrow(post, Error, 'Post not found')

    const postComment = await PostComment.create({
        content: body.content,
        postId,
        owner: user.id,
    })

    res.json(postComment)
}

export async function removeComment(req, res) {
    const { PostComment, Post } = req.app.get('models')
    const { user } = res.locals
    const { postId } = req.params
    const { commentId } = req.params

    const post = await Post.findById(postId)

    assertOrThrow(post, Error, 'Post not found')

    const postComment = await PostComment.findById(commentId)

    assertOrThrow(postComment, Error, 'Post comment not found')

    await postComment.destroy()

    res.json({ status: 'ok' })
}

export async function updateComment(req, res) {

    const { PostComment, Post } = req.app.get('models')
    const { user } = res.locals
    const { postId } = req.params
    const { commentId } = req.params
    const body = req.body

    const post = await Post.findById(postId)

    assertOrThrow(post, Error, 'Post not found')

    let postComment = await PostComment.findById(commentId)

    assertOrThrow(postComment, Error, 'Post comment not found')

    postComment = await postComment.update({
        content: body.content,
        postId,
        owner: user.id,        
    })

    res.json(postComment)
}

import { assertOrThrow, pick } from '../utils'
import { normalizeWords } from '../lib/tfidf'
import { USER_ROLES } from '../models/user'
import { NotFound, Forbidden } from '../errors'

export async function createPost(req, res) {

    const { Blog, Post } = req.app.get('models')
    const { user } = res.locals
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, NotFound, 'Blog not found')

    // TODO(dliszka): Add roles to user-blog. (owner of blog, shared)
    // assertOrThrow(blog.userId === user.id, Forbidden, 'Forbidden')

    const input = pick(req.body, 'title content photoUrl publishDate tags')

    const post = await Post.create({
        title: input.title,
        content: input.content,
        tags: normalizeWords(input.tags),
        photoUrl: input.photoUrl,
        publishDate: input.publishDate,
        blogId,
        ownerId: user.id,
    })

    res.json(post)
}

export async function getPost(req, res) {

    const { Post, Blog } = req.app.get('models')
    const { postId, blogId } = req.params

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, NotFound, 'Blog not found')

    const post = await Post.findById(postId)

    assertOrThrow(post, NotFound, 'Post not found')

    res.json(post)
}

export async function updatePost(req, res) {

    const { Post, Blog } = req.app.get('models')
    const { postId, blogId } = req.params
    const { user } = res.locals
    const body = req.body

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, NotFound, 'Blog not found')

    const post = await Post.findById(postId)

    assertOrThrow(post, NotFound, 'Post not found')

    body.tags = normalizeWords(body.tags)

    await post.update(Object.assign({modifierId: user.id}, body))

    res.json(post)
}

export async function deletePost(req, res) {

    const { Post, Blog } = req.app.get('models')
    const { postId, blogId } = req.params

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, NotFound, 'Blog not found')

    const post = await Post.findById(postId)

    assertOrThrow(post, NotFound, 'Post not found')

    await post.destroy()

    res.json({ status: 'ok' })
}

export async function getBlogPosts(req, res) {
    
    const { Blog, Post } = req.app.get('models')
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)

    assertOrThrow(blog, NotFound, 'Blog not found')

    const posts = await Post.findAll({
        where: {
            blogId,
        }
    })

    res.json(posts)
}

export async function getPostsFromMyList(req, res) {

    const { Subscription, Post } = req.app.get('models')
    const { offset = 0, limit = 20  } = req.params
    const { user } = res.locals

    const subscriptions = await Subscription.findAll({
        where: {
            userId: user.id,
        }
    })

    const blogIds = subscriptions.map(s => s.blogId)

    const posts = await Post.findAndCountAll({
        where: {
            blogId: {
                $contains: blogIds
            }
        },
        order: '"publishDate" DESC',
        limit,
        offset,
    })

    res.json(posts)
}

export async function getComments(req, res) {

    const { PostComment, Post, User } = req.app.get('models')
    const { offset = 0, limit = 20 } = req.query
    const { postId } = req.params

    const post = await Post.findById(postId)

    assertOrThrow(post, NotFound, 'Post not found')

    const postComments = await PostComment.findAndCountAll({
        where: {
            postId: postId,
        },
        include: [{
            model: User,
        }],
        order: [['createdAt', 'DESC']],
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

    assertOrThrow(post, NotFound, 'Post not found')

    const postComment = await PostComment.create({
        content: body.content,
        postId,
        owner: user.id,
    })

    res.json(postComment)
}

export async function removeComment(req, res) {
    
    const { PostComment, Post, Blog, UserBlog } = req.app.get('models')
    const { user } = res.locals
    const { blogId, postId } = req.params
    const { commentId } = req.params

    const blog = await Blog.findById(blogId)
    assertOrThrow(blog, NotFound, 'Blog not found')

    const post = await Post.findById(postId)
    assertOrThrow(post, NotFound, 'Post not found')

    const postComment = await PostComment.findById(commentId)
    assertOrThrow(postComment, NotFound, 'Post comment not found')

    const isAuthor = await UserBlog.isAuthor(blogId, user.id)

    assertOrThrow(user.role === USER_ROLES.ADMIN || isAuthor, Forbidden, 'Insufficent rights')

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

    assertOrThrow(post, NotFound, 'Post not found')

    let postComment = await PostComment.findById(commentId)

    assertOrThrow(postComment, NotFound, 'Post comment not found')

    postComment = await postComment.update({
        content: body.content,
        postId,
        owner: user.id,
    })

    res.json(postComment)
}

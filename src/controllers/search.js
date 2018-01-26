import { assertOrThrow } from '../utils'
import { getTf, getIdf, getWords, normalizeWords } from '../lib/tfidf'

export async function search(req, res) {

    const { Blog, Post } = req.app.get('models')
    const { query, limit = 20, offset = 0 } = req.query

    const queryWords = normalizeWords(getWords(query))

    const customBlogConst = 1
    const customPostTitleConst = 0.5

    const blogTfidf = {}
    const blogs = await Blog.findAll({})

    for (const blog of blogs) {
        const words = normalizeWords(getWords(blog.title))

        for (const queryWord of queryWords) {
            if (words.includes(queryWord)) {

                const result = getTf(queryWord, words)*getIdf(queryWord, blogs, 'title')
                if (result > 0) {
                    if (!blogTfidf[blog.id]) {
                        blogTfidf[blog.id] = result + customBlogConst
                    } else {
                        blogTfidf[blog.id] += result + customBlogConst
                    }
                }
            }
        }
    }


    const postTfidf = {}
    const posts = await Post.findAll({})

    for (const post of posts) {
        const titleWords = normalizeWords(getWords(post.title))
        const contentWords = normalizeWords(getWords(post.content))
        const words = titleWords.concat(contentWords)
        
        for (const queryWord of queryWords) {
            if (words.includes(queryWord)) {
                const result = getTf(queryWord, words)*getIdf(queryWord, posts, 'content')
                if (result > 0) {
                    let customConst = 0

                    if (titleWords.includes(queryWord)) {
                        customConst = customPostTitleConst
                    }

                    if (!postTfidf[post.id]) {
                        postTfidf[post.id] = result + customConst
                    } else {
                        postTfidf[post.id] += result + customConst
                    }
                }
            }
        }
    }

    const _sortable = []
    for (const blogId in blogTfidf) {
        _sortable.push([blogs.filter(b => b.id === blogId)[0], { tfidf: blogTfidf[blogId], type: 'blog' }])
    }

    for (const postId in postTfidf) {
        _sortable.push([posts.filter(p => p.id === postId)[0], { tfidf: postTfidf[postId], type: 'post' }])
    }

    _sortable.sort(function(a, b) {
        return b[1]-a[1]
    });

    const sortable = []
    for (let i = 0; i < _sortable.length; ++i) {
        sortable.push(_sortable[i])
    }

    console.log(blogTfidf)

    res.json({ result: sortable })
}

export async function searchBlogs() {
    const { Blog } = req.app.get('models')
    const { query, limit = 20, offset = 0 } = req.query

    const queryWords = normalizeWords(getWords(query))

    const blogTfidf = {}
    const blogs = await Blog.findAll({})

    for (const blog of blogs) {
        const words = normalizeWords(getWords(blog.title))

        for (const queryWord of queryWords) {
            if (words.includes(queryWord)) {
                const result = getTf(queryWord, words)*getIdf(queryWord, posts, 'content')
                if (result > 0) {
                    if (!blogTfidf[blog.id]) {
                        blogTfidf[blog.id] = result + customBlogConst
                    } else {
                        blogTfidf[blog.id] += result + customBlogConst
                    }
                }
            }
        }
    }

    const sortable = [];
    for (const blogId in blogTfidf) {
        sortable.push([blogId, blogTfidf[blogId]]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });

    console.log(sortable)

    res.json({})
}
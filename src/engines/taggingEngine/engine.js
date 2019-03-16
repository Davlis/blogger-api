import generateConfig from '../../config'
import initSequelizeFromConfig from '../../database'
import { getTf, getIdf, getWords } from '../../lib/tfidf'

const engineTimeInterval = process.env.TAGGING_INTERVAL || 60 * 60 * 24

process.on('unhandledRejection', console.error)

handler().catch(err => console.log(err))

async function handler() {
  const config = generateConfig('../../../.env')

  const { sequelize, models } = initSequelizeFromConfig(config)

  startInterval(engineTimeInterval, () => start(sequelize, models))
}

async function start(sequelize, models) {
  const { Blog, Post } = models

  const blogs = await Blog.findAll({})

  for (const blog of blogs) {
    const posts = await Post.findAll({
      where: {
        blogId: blog.id
      }
    })

    for (const post of posts) {
      const words = getWords(post.content)
      const tfidf = {}
      for (const word of words) {
        if (!tfidf[word]) {
          tfidf[word] = getTf(word, words) * getIdf(word, posts, 'content')

          console.log('tf(', word, ') = ', getTf(word, words))
          console.log('idf(', word, ') = ', getIdf(word, posts, 'content'))
          console.log('tfidf(', word, ') = ', tfidf[word])
        }
      }
      console.log(tfidf)
    }
  }
}

function startInterval(seconds, callback) {
  callback()
  return setInterval(callback, seconds * 1000)
}

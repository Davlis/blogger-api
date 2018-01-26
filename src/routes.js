import { Router } from 'express'

import Authenticate from './middleware/authenticate'
import authRoutes from './routes/auth'
import homeRoutes from './routes/home'
import blogRoutes from './routes/blog'
import postRoutes from './routes/post'
import reportRoutes from './routes/report'
import subscriptionRoutes from './routes/subscription'

const router = Router()

router.use('/auth', authRoutes)
router.use('/home', Authenticate, homeRoutes)
router.use('/blogs', Authenticate, blogRoutes)
router.use('/blogs/:blogId/posts', Authenticate, postRoutes)
router.use('/report', Authenticate, reportRoutes)
router.use('/subscription', Authenticate, subscriptionRoutes)

export default router

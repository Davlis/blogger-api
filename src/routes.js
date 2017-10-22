import { Router } from 'express'

import Authenticate from './middleware/authenticate'
import authRoutes from './routes/auth'
import homeRoutes from './routes/home'
import blogRoutes from './routes/blog'

const router = Router();

router.use('/auth', authRoutes)
router.use('/home', Authenticate, homeRoutes)
router.use('/blogs', Authenticate, blogRoutes)

export default router
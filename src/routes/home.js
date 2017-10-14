import { Router } from 'express'
const router = Router();

router.get('/', (req, res) => {
    const user = res.locals.user
    res.send('Welcome ' + (user.username || user))
})

export default router
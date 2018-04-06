import jwt from 'jsonwebtoken'
import { assertOrThrow } from '../utils'
import { BadRequest, NotFound, Unauthorized } from '../errors';

export default function authenticate(req, res, next) {

    wrap().catch(err => next(err))

    async function wrap() {
        const config = res.app.get('config')
        const { authorization } = req.headers
        const { User } = req.app.get('models')

        let user

        assertOrThrow(authorization, BadRequest, 'Authorization header is missing')

        if (authorization.includes('Bearer ')) {
            const token = authorization.replace('Bearer ', '')
            try {
                let payload = jwt.verify(token, config.salt)
                user = await User.findById(payload.id)
            } catch (err) {
                throw new Unauthorized('Invalid Bearer Token')
            }
        } else if (authorization.includes('User ')) {
            const email = authorization.replace('User ', '')
            user = await User.findByEmail(email)
        } else {
            throw new BadRequest('Invalid format of Authorization header')
        }

        assertOrThrow(user, NotFound, 'User not found')

        res.locals.user = user
        next()
    }
}

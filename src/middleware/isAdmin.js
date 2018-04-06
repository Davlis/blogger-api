import { assertOrThrow } from '../utils'
import { Unauthorized } from '../errors'

export default function isAdmin(req, res, next) {

    wrap().catch(err => next(err))

    async function wrap() {
        const { User } = req.app.get('models')
        const { user } = res.locals

        assertOrThrow(user.role === User.USER_ROLES.ADMIN, Unauthorized, 'Insufficient rights')

        next()
    }
}

import { assertOrThrow, pick } from '../utils'
import { USER_ROLES } from '../models/user'

export async function updateUser(req, res) {

    const config = res.app.get('config')
    const { User } = req.app.get('models')
    let { user } = res.locals
    const { email, password, lastName, firstName } = req.body

    const passhash = User.hashPassword(password, config.salt)

    user = await user.update({
        email,
        password,
        lastName,
        firstName,
        passhash,
        role: USER_ROLES.CUSTOMER,
    })

    res.json(user)
}

export async function deleteUser(req, res) {

    const { User } = req.app.get('models')
    const { user } = res.locals

    await user.destroy()

    res.json({ status: 'ok' })
}

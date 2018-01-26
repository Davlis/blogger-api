import { assertOrThrow } from '../utils'
import { USER_ROLES, USER_STATUS } from '../models/user'

export async function login(req, res) {

    const config = res.app.get('config')
    const { email, password } = req.body
    const { User } = req.app.get('models')

    const user = await User.findByEmail(email)
    
    assertOrThrow(user, Error, 'User not found')

    assertOrThrow(user.status !== USER_STATUS.BLOCKED, Error, 'User is blocked')

    assertOrThrow(
        user.getDataValue('passhash') === User.hashPassword(password, config.salt),
        Error,
        'Invalid password')

    const token = User.getAuthToken(user.id, config.salt)

    res.json({ user, token })       
}

export async function register(req, res) {

    const config = res.app.get('config')
    const { email, password, lastName, firstName } = req.body
    const { User } = req.app.get('models')

    const passhash = User.hashPassword(password, config.salt)

    const user = await User.create({
        email,
        password,
        lastName,
        firstName,
        passhash,
        role: USER_ROLES.CUSTOMER,
    })

    res.json(user)
}

export async function resetPassword(req, res) {
    const { User } = req.app.get('models')

    const input = pick(req.body, 'email')

    const user = await User.findByEmail(input.email)

    assertOrThrow(user, Error, 'User not found')

    res.json({ status: 'ok' })
}

import { assertOrThrow } from '../utils'
import { USER_ROLES } from '../models/user'

export async function login(req, res) {
    const config = res.app.get('config')
    const { email, password } = req.body
    const { User } = req.app.get('models')

    const user = await User.findByEmail(email)
    
    assertOrThrow(user, Error, 'User not found')

    assertOrThrow(
        user.getDataValue('passhash') === User.hashPassword(password, config.salt),
        Error,
        'Invalid password')

    const token = User.getAuthToken(user.id, config.salt)

    res.send({ user, token })       
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

    res.send(user)
}
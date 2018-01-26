import { assertOrThrow, pick } from '../utils'
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

    const token = user.issueAuthToken(config.salt, config.auth)

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
    const mailer = req.app.get('mailer')
    const config = req.app.get('config')

    const input = pick(req.body, 'email')

    const user = await User.findByEmail(input.email)

    assertOrThrow(user, Error, 'User not found')

    const response = await user.sendResetPasswordEmail(mailer, config)
    
    res.json(response)
}

export async function setPassword(req, res) {
    const { salt } = req.app.get('config')
    const { User } = req.app.get('models')
    const body = req.body

    let payload
    try {
        payload = jwt.verify(body.token, salt)
    } catch (err) {
        throw new Error('Invalid token')
    }

    assertOrThrow(
        payload.type === User.TOKEN_TYPES.ACCESS_TOKEN ||
        payload.type === User.TOKEN_TYPES.RESET_PASSWORD,
        Error,
        'Invalid token type'
    )

    const user = await User.findById(payload.id)

    assertOrThrow(user, Error, 'Cant find a user with that token')

    user.setPassword(body.password, salt)
    await user.save()

    res.json({ status: 'ok' })
}

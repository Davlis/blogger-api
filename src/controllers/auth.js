import jwt from 'jsonwebtoken'
import { assertOrThrow, pick } from '../utils'
import { USER_ROLES, USER_STATUS } from '../models/user'
import { NotFound, Forbidden, BadRequest } from '../errors';

export async function login(req, res) {

    const config = res.app.get('config')
    const { email, password } = req.body
    const { User } = req.app.get('models')

    const user = await User.findByEmail(email)
    
    assertOrThrow(user, NotFound, 'User not found')

    assertOrThrow(user.status !== USER_STATUS.BLOCKED, Forbidden, 'User is blocked')

    assertOrThrow(
        user.getDataValue('passhash') === User.hashPassword(password, config.salt),
        BadRequest,
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

    res.json({
        user,
        token: user.issueAuthToken(config.salt, config.auth),
    })
}

export async function resetPassword(req, res) {
    const { User } = req.app.get('models')
    const mailer = req.app.get('mailer')
    const config = req.app.get('config')

    const input = pick(req.body, 'email')

    const user = await User.findByEmail(input.email)

    assertOrThrow(user, NotFound, 'User not found')

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
        throw new BadRequest('Invalid token')
    }

    assertOrThrow(
        payload.type === User.TOKEN_TYPES.ACCESS_TOKEN ||
        payload.type === User.TOKEN_TYPES.RESET_PASSWORD,
        BadRequest,
        'Invalid token type'
    )

    const user = await User.findById(payload.id)

    assertOrThrow(user, NotFound, 'Cant find a user with that token')

    user.setPassword(body.password, salt)
    await user.save()

    res.json({ status: 'ok' })
}

export async function refreshToken(req, res) {

    const { salt, auth: authConfig } = req.app.get('config')

    const { User } = req.app.get('models')
    const { refreshToken } = req.body

    console.log(refreshToken)

    let payload
    try {
        payload = jwt.verify(refreshToken, salt)
    } catch (err) {
        console.log(err)
    }

    let user = await User.findById(payload.id)

    assertOrThrow(user, NotFound, 'User not found')

    res.json(user.issueAuthToken(salt, authConfig))
}

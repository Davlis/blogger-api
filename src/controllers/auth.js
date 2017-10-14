import jwt from 'jsonwebtoken'

export function login(req, res) {
    const config = res.app.get('config')
    const { email, password } = req.body

    if (email === config.rootEmail && password === config.rootPassword) {
        const token = jwt.sign({
            email,
        }, config.salt)

        res.send({ email, token })
    } else {
        throw 'Login error'
    }
}

export async function register(req, res) {
    const { email, password, lastName, firstName } = req.body
    const { User } = req.app.get('models')

    const user = await User.create({
        email,
        password,
        lastName,
        firstName,
    })

    res.send(user)
}
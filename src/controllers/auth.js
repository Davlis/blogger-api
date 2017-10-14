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

export function register(req, res) {
    res.status(501).json('Not implemented.')
}
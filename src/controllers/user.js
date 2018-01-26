import { assertOrThrow, pick } from '../utils'

export async function updateUser(req, res) {
    res.json({ status: 'Not implemented' })
}

export async function deleteUser(req, res) {
    res.json({ status: 'Not implemented' })
}

export async function changePassword(req, res) {
    const { User } = req.app.get('models')
    const { user } = res.locals

    const input = pick(req.body, 'password')

    res.json({ status: 'Not implemented' })
}

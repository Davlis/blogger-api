import { assertOrThrow, pick } from '../utils'

export async function blockUser(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}

export async function deleteUserBlog(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}

export async function deleteUserPost(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}

export async function deleteUserComment(req, res) {
    res.json({ status: 'NOT IMPLEMENTED' })
}

export async function getUsers(req, res) {
    const { User } = req.app.get('models')
    const { user } = res.locals

    const users = await User.findAll({})

    res.json({users})
}

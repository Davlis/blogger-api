export async function welcome(req, res) {
    const user = res.locals.user
    res.json({ message: 'Welcome ' + (user.toJSON().firstName) })
}

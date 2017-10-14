export function welcome(req, res) {
    const user = res.locals.user
    res.send('Welcome ' + (user.username || user))
}
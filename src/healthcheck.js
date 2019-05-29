export default async function performHealthCheck(req, res) {
    res.status(200).json({ ping: 'pong'})
}

export default async function performHealthCheck(req, res) {
    const dbClient = req.app.get('sequelize')

    try {
        await dbClient.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';')
    } catch (error) {
        console.error(error)
        res.status(500).json({ ok: false })
    }

    res.status(200).json()
}

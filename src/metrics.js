export async function performMetricLoadTest(req, res) {
    setTimeout(() => {
        res.status(200).json({
            time: new Date().toISOString(),
            randomNumber: Math.random()
        })
    }, 35)
}

export async function performMetricFailureTest(req, res) {
    res.status(200).json({ ok: true })

    const randomNumb = Math.floor(Math.random() * 100)
    if (randomNumb === 50) {
        setTimeout(() => {
            process.exit(101)
        }, 100)
    }
}

import { assertOrThrow, pick } from '../utils'
import { REPORT_TYPES } from '../models/report'

export async function report(req, res) {
    const sequelize = req.app.get('sequelize')
    const { Report } = req.app.get('models')
    const { user } = res.locals

    const input = pick(req.body, 'type body id')

    const report = {
        accuser: user.id,
        body: input.body,
    }

    assertOrThrow(input.type, Error, 'Report type is required')

    assertOrThrow(Object.values(REPORT_TYPES).includes(input.type), Error, 'Invalid value for report type')

    report.type = input.type
    report[input.type + 'Id'] = input.id

    await Report.create(report)
    res.send(report)
}
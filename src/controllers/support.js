import { pick, compileTemplate } from '../utils'

const supportTemplate = compileTemplate('support')

export async function addSupportRequest(req, res) {
    const config = req.app.get('config')
    const mailer = req.app.get('mailer')
    const userInput = pick(req.body, 'type body')
    const { user } = res.locals

    userInput.fromEmail = user.email
    userInput.firstName = user.firstName
    userInput.lastName = user.lastName

    const email = {
        from: `Blogger notifications <notifications@${config.mailer.SENDGRID_DOMAIN}>`,
        to: config.supportEmail,
        subject: `Support request - ${userInput.type} - ${user.email}`,
        html: supportTemplate({ supportData: userInput }),
    }

    const status = await mailer.send(email)
    res.json(status)
}
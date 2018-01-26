import generateConfig from '../config'
import initSequelizeFromConfig from '../database'

go().catch(err => console.log(err))

async function go() {

    const config = generateConfig()

    const { sequelize, models } = initSequelizeFromConfig(config)
    
    await generateAdminUser(models)

    sequelize.close()
}

export async function generateAdminUser({ User }) {

    const root = User.build({
        role: User.USER_ROLES.ADMIN,
        email: process.env.ROOT_EMAIL,
        firstName: process.env.ROOT_FIRST_NAME,
        lastName: process.env.ROOT_LASTNAME,
    })

    root.setPassword(process.env.ROOT_PASSWORD, process.env.SALT)
    await root.save()
}

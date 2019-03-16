import generateConfig from '../config'
import initSequelizeFromConfig from '../database'

drop().catch(err => console.log(err))

async function drop() {
    if (process.env.NODE_ENV === 'production') {
        console.log('Dropping database for production is prohibited')
        return
    }

    const config = generateConfig()

    const { sequelize } = initSequelizeFromConfig(config)
    
    await sequelize.drop()

    sequelize.close()
}

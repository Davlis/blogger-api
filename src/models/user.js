import { DataTypes } from 'sequelize'

export default function(sequelize) {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        passhash: {
            type: DataTypes.STRING(128),
            allowNull: true,
            get() { return undefined },
        },
        email: {
            type: DataTypes.STRING(511),
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 512],
                isEmail: true,
                forbiddenCharacters(val) {
                    if (/[&=<>+,]/.test(val)) {
                        throw Error('Email contains forbidden characters')
                    }
                },
                noTwoDotsInARow(val) {
                    if (val.includes('..')) {
                        throw Error('Email can\'t have two dots in a row')
                    }
                },
            },
        },
    });

    User.sync()
    return User
}
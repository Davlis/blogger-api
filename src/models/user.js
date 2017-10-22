import { DataTypes } from 'sequelize'
import { createHmac } from 'crypto'
import jwt from 'jsonwebtoken'

export const USER_ROLES = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
}

const SCHEMA = {
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
    role: {
        type: DataTypes.ENUM(Object.values(USER_ROLES)),
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING(511),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}

export default function(sequelize) {
    const User = sequelize.define('user', SCHEMA);

    User.hashPassword = (password, salt) => {
        return createHmac('sha512', salt)
            .update(password)
            .digest('hex')
    }

    User.getAuthToken = (id, salt) => {
        return jwt.sign({
            id,
        }, salt)
    }

    User.findByEmail = async (email) => {
        const user = await User.find({
            where: {
                email: email,
            },
        })
        return user
    }

    return User
}
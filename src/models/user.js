import { DataTypes } from 'sequelize'
import { createHmac } from 'crypto'
import jwt from 'jsonwebtoken'
import { compileTemplate } from '../utils'

export const USER_ROLES = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
}

export const USER_STATUS = {
    ACTIVE: 'actived',
    BLOCKED: 'blocked',
}

export const TOKEN_TYPES = {
    ACCESS_TOKEN: 'access-token',
    REFRESH_TOKEN: 'refresh-token',
    RESET_PASSWORD: 'reset-password',
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
    status: {
        type: DataTypes.ENUM(Object.values(USER_STATUS)),
        allowNull: false,
        defaultValue: USER_STATUS.ACTIVE,
    },
    bio: {
        type: DataTypes.STRING(511),
        allowNull: true,
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

const passwordResetTemplate = compileTemplate('reset-password')

export default function(sequelize) {
    const User = sequelize.define('user', SCHEMA)

    User.USER_ROLES = USER_ROLES
    User.USER_STATUS = USER_STATUS
    User.TOKEN_TYPES = TOKEN_TYPES

    User.hashPassword = (password, salt) => {
        return createHmac('sha512', salt)
            .update(password)
            .digest('hex')
    }

    User.prototype.issueAuthToken = function(salt, authConfig) {
        return {
            accessToken: this.issueToken(
                TOKEN_TYPES.ACCESS_TOKEN,
                salt,
                authConfig.accessTokenLifetime
            ),
            refreshToken: this.issueToken(
                TOKEN_TYPES.REFRESH_TOKEN,
                salt,
                authConfig.refreshTokenLifetime
            ),
            expiresIn: authConfig.accessTokenLifetime,
        }
    }

    User.findByEmail = async (email) => {
        const user = await User.find({
            where: {
                email: email,
            },
        })
        return user
    }

    User.prototype.setPassword = function (val, salt) {
        this.setDataValue('passhash', User.hashPassword(val, salt))
    }

    User.prototype.issueToken = function(type, salt, expiresIn) {
        return jwt.sign({
            id: this.id,
            type: type,
        }, salt, { expiresIn })
    }

    User.prototype.sendResetPasswordEmail = async function(mailer, config) {
        const resetEmailToken = this.issueToken(
            TOKEN_TYPES.RESET_PASSWORD,
            config.salt,
            config.auth.resetEmailTokenLifetime
        )

        const resetUrl = `${config.app.domain}/password-reset?token=${resetEmailToken}`

        const email = {
            from: `Blogger helper <no-reply@${config.mailer.SENDGRID_DOMAIN}>`,
            to: this.email,
            subject: 'Password reset',
            html: passwordResetTemplate({ resetUrl }),
        }

        const status = await mailer.send(email)

        return { email, status }
    }

    return User
}

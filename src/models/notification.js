import { DataTypes } from 'sequelize'

export const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING(511),
        allowNull: false,
        validate: {
            len: [2, 512],
        },
    },
    isUnread: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}

export default function(sequelize) {
    const Notification = sequelize.define('notification', SCHEMA)

    Notification.associate = function({ User }) {
        Notification.belongsTo(User)
    }

    return Notification
}

import { DataTypes } from 'sequelize'

const SCHEMA = {
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
    blogId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'blogs',
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}

export default function(sequelize) {
    const Subscription = sequelize.define('subscription', SCHEMA)

    Subscription.associate = function({User, Blog}) {
        Subscription.belongsTo(User)
        Subscription.belongsTo(Blog)
    }

    return Subscription
}

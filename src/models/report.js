import { DataTypes } from 'sequelize'

export const TYPES = {
  POST: 'post',
  BLOG: 'blog',
  USER: 'user',
}

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    accuser: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM(Object.values(TYPES)),
        allowNull: false,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'posts',
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
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
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
    const Report = sequelize.define('report', SCHEMA)

    Report.associate = function({User, Post, Blog}) {
        Report.belongsTo(User, { foreignKey: 'accuser' })
        Report.belongsTo(User, { as: 'ReportedUser', foreignKey: 'userId' })
        Report.belongsTo(Post)
        Report.belongsTo(Blog)
    }

    return Report
}

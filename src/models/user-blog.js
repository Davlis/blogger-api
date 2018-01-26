import { DataTypes } from 'sequelize'

const SCHEMA = {
    blogId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'blogs',
            key: 'id',
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
}

export default function(sequelize) {
    const UserBlog = sequelize.define('user_blog', SCHEMA)

    UserBlog.associate = function({ User, Blog }) {
        UserBlog.belongsTo(User)
        UserBlog.belongsTo(Blog)
    }

    return UserBlog
}

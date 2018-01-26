import { DataTypes } from 'sequelize'

const SCHEMA = {
    owner: {
        type: DataTypes.UUID,
        allowNull: false,
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
    content: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: "",
    },
}

export default function(sequelize) {
    const BlogComment = sequelize.define('blog_comment', SCHEMA)

    BlogComment.associate = function({ User, Blog }) {
        BlogComment.belongsTo(User)
        BlogComment.belongsTo(Blog)
    }

    return BlogComment
}

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
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'posts',
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
    const PostComment = sequelize.define('post_comment', SCHEMA);

    PostComment.associate = function({ User, Post }) {
        PostComment.belongsTo(User)
        PostComment.belongsTo(Post)
    }

    return PostComment
}

import { DataTypes } from 'sequelize'

export const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.JSON,
        defaultValue: "",
    },
    publishDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    blogId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'blogs',
            key: 'id',
        },
    }
}

export default function(sequelize) {
    const Post = sequelize.define('post', SCHEMA)

    Post.associate = function({ Blog }) {
        Post.belongsTo(Blog, { foreignKey: 'blogId' })
    }

    return Post
}

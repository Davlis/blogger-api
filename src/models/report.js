import { DataTypes } from 'sequelize'

export const REPORT_TYPES = {
    POST: 'post',
    BLOG: 'blog',
    USER: 'user',
    BLOG_COMMENT: 'blog_comment',
    POST_COMMENT: 'post_comment',
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
        type: DataTypes.ENUM(Object.values(REPORT_TYPES)),
        allowNull: false,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'posts',
            key: 'id',
        },
    },
    blogId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'blogs',
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    postComment: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'post_comments',
            key: 'id',
        },
    },
    blogComment: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'blog_comments',
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

    Report.associate = function({User, Post, Blog, PostComment, BlogComment }) {
        Report.belongsTo(User, { foreignKey: 'accuser' })
        Report.belongsTo(User, { as: 'ReportedUser', foreignKey: 'userId' })
        Report.belongsTo(Post)
        Report.belongsTo(Blog)
        Report.belongsTo(PostComment)
        Report.belongsTo(BlogComment)
    }

    return Report
}

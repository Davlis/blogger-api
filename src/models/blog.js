import { DataTypes } from 'sequelize'

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING(511),
        allowNull: true,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    },
    owner: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    }
}

export default function(sequelize) {
    const Blog = sequelize.define('blog', SCHEMA)

    Blog.associate = function({ User }) {
        Blog.belongsTo(User, { foreignKey: 'owner' })
    }

    return Blog
}

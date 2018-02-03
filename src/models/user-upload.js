import { DataTypes } from 'sequelize'

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    uploadUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}

export default function(sequelize) {
    const UserUpload = sequelize.define('user_upload', SCHEMA)

    UserUpload.associate = function({ User }) {
        UserUpload.belongsTo(User)
    }

    return UserUpload
}

import { DataTypes } from 'sequelize'

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
}

export default function(sequelize) {
    const Post = sequelize.define('post', SCHEMA);

    return Blog
}
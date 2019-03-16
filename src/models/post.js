import { DataTypes } from 'sequelize'

export const SCHEMA = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.JSON,
    defaultValue: ''
  },
  photoUrl: {
    type: DataTypes.STRING(511),
    allowNull: true
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: []
  },
  publishDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  blogId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'blogs',
      key: 'id'
    }
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  modifierId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}

export default function(sequelize) {
  const Post = sequelize.define('post', SCHEMA)

  Post.associate = function({ Blog, User }) {
    Post.belongsTo(Blog, { foreignKey: 'blogId' })
    Post.belongsTo(User, { foreignKey: 'ownerId' })
    Post.belongsTo(User, { foreignKey: 'modifierId' })
  }

  return Post
}

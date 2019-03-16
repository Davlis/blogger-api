import { DataTypes } from 'sequelize'

const SCHEMA = {
  blogId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'blogs',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}

export default function(sequelize) {
  const UserBlog = sequelize.define('user_blog', SCHEMA)

  UserBlog.associate = function({ User, Blog }) {
    UserBlog.belongsTo(User)
    UserBlog.belongsTo(Blog)
  }

  UserBlog.isAuthor = async function(blogId, userId) {
    const userBlog = await UserBlog.find({
      where: {
        userId: userId,
        blogId: blogId
      }
    })
    return !!userBlog
  }

  return UserBlog
}

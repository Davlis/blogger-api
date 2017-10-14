import { DataTypes, Sequelize } from 'sequelize'

export default function(sequelize) {
    const User = sequelize.define('user', {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      }
    });

    User.sync({ force: true }).then(() => {
      return User.create({
        firstName: 'Dave',
        lastName: 'Hancock'
      });
    });
}
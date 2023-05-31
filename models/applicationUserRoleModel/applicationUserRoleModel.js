
module.exports = (sequelize, DataTypes) => {
    const applicationUsersRole = sequelize.define('applicationUsersRole', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_role: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

    }, {
      tableName: 'applicationUsersRole'
    })
    return applicationUsersRole
  }
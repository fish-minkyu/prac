'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.UserInfos, {
        foreignKey: 'userId'
      })
      this.belongsTo(models.UserInfos, {
        targetKey: 'nickname',
        foreignKey: 'nickname'
      })
    }
  }
  UserInfo.init({
    infoId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    nickname: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    age: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    birthyear: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'UserInfos',
  });
  return UserInfo;
};
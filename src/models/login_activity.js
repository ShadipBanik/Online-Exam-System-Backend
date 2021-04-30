'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login_activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Login_activity.init({
    email: {
      type: DataTypes.STRING
    },
    loginAttemptCount: {
      type: DataTypes.INTEGER
    },
    lastRryDateTime: {
      type: DataTypes.DATE
    },
    ip: {
      type: DataTypes.STRING
    },
    location:{
      type:DataTypes.STRING,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Login_activity',
  });
  return Login_activity;
};
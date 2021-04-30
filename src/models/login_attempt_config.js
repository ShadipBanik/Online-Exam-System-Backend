'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login_attempt_config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Login_attempt_config.init({
    max_login_attempt: {
      type: DataTypes.INTEGER,
    },
    failure_expiration_duration_mins: {
      type: DataTypes.INTEGER,
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
    modelName: 'Login_attempt_config',
  });
  return Login_attempt_config;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // users.belongsTo(models.role,{
      //   foreignKey:'id',
      //   targetKey:'roleId'
      // })

    }
  };
  users.init({
    firstname: { allowNull:false,type:DataTypes.STRING},
    lastname:{ allowNull:false,type:DataTypes.STRING},
    email:{ allowNull:false,type:DataTypes.STRING},
    password:{ allowNull:false,type:DataTypes.STRING},
    phone:{ allowNull:false,type:DataTypes.STRING},
    address:{ allowNull:false,type:DataTypes.STRING},
    country:{ allowNull:false,type:DataTypes.STRING},
    roleId:{
      allowNull:false,
      type:DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
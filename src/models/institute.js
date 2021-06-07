'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class institute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      institute.hasMany(models.users,{
        as:'users',
        foreignKey:'instituteId',
        targetKey:'instituteId'
      })
      institute.hasMany(models.department,{
        as:'department',
        foreignKey:'instituteId',
        targetKey:'instituteId'
      })
    }
  };
  institute.init({
    name: DataTypes.STRING,
    location:DataTypes.STRING,
    email:DataTypes.STRING,
    instituteHeadName:DataTypes.STRING,
     
  }, {
    sequelize,
    modelName: 'institute',
  });
  return institute;
};
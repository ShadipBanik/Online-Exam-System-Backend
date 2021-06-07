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
      
      users.belongsTo(models.role,{
        as:'role',
        foreignKey:'roleId',
      })
      users.belongsTo(models.institute,{
        as:'institute',
        foreignKey:'instituteId'
      })

    }
  };
  users.init({
    firstname: { allowNull:false,type:DataTypes.STRING},
    lastname:{ allowNull:false,type:DataTypes.STRING},
    email:{ allowNull:false,type:DataTypes.STRING},
    password:{ allowNull:false,type:DataTypes.STRING},
    phone:{ allowNull:true,type:DataTypes.STRING},
    address:{ allowNull:true,type:DataTypes.STRING},
    country:{ allowNull:true,type:DataTypes.STRING},
    gender:{allowNull:true,type:DataTypes.STRING},
    status:{allowNull:false,type:DataTypes.STRING},
    instituteId:{allowNull:true,type:DataTypes.INTEGER},
    roleId:{
      allowNull:false,
      type:DataTypes.INTEGER,
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
    modelName: 'users',
  });
  return users;
};
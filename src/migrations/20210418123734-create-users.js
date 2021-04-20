'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: { allowNull: false, type: Sequelize.STRING }
      },
      lastname: { allowNull: false, type: Sequelize.STRING },
      email: { allowNull: false, type: Sequelize.STRING },
      password: { allowNull: false, type: Sequelize.STRING },
      phone: { allowNull: false, type: Sequelize.STRING },
      address: { allowNull: false, type: Sequelize.STRING },
      country: { allowNull: false, type: { allowNull: false, type: Sequelize.STRING } },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'role',
          key: 'id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASECADE"

      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,

      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
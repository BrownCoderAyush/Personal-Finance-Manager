'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull:false
      },
      username:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password:{
        type: Sequelize.STRING,
        allowNull:false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email:{
        type: Sequelize.STRING,
        allowNull:false
      },
      occupation:{
        type: Sequelize.STRING,
      },
      address:{
        type: Sequelize.STRING,
      }
    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
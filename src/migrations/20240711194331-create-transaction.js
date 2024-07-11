'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      transaction_type: {
        type: Sequelize.ENUM('+','-'),
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete : 'CASCADE',
        references : {
          model : 'Categories',
          key : 'id',
          as : 'categoryId'
        }
      },
      description: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};
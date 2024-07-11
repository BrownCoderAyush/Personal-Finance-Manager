'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    amount: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    date: {
      type:DataTypes.DATE,
      allowNull:false
    },
    categoryId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    transaction_type: {
      type: DataTypes.ENUM('+','-'),
      allowNull: false
    },
    description: {
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    timestamps: false
  });
  return Transaction;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavingGoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SavingGoal.belongsTo(models.User,{
        foreignKey : 'userId',
        onDelete :'CASCADE',
        as:'saving_goal_belongs_to_a_user'
      })
    }
  }
  SavingGoal.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    date: {
      type:DataTypes.DATE,
      allowNull:false
    },
    amount: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'SavingGoal',
  });
  return SavingGoal;
};
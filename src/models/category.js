'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.User,{
        foreignKey : 'userId',
        onDelete :'CASCADE',
        as:'category_belongs_to_a_user'
      })
      Category.hasMany(models.Transaction,{
        foreignKey:'categoryId',
        as:'category_has_many_transactions'
      })
    }
  }
  Category.init({
    userId:{ 
      type : DataTypes.INTEGER,
      allowNull : false
    },
    type:{
       type : DataTypes.STRING,
       allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Category',
    timestamps : false
  });
  return Category;
};
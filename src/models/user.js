'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Category,{
        foreignKey:'userId',
        as:'user_has_many_categories'
      })
      User.hasMany(models.Transaction,{
        foreignKey:'userId',
        as:'user_has_many_transactions'
      })

    }
  }
  User.init({
    firstname: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull:false
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    phonenumber: {
      type: DataTypes.STRING(10),
      allowNull:false,
      validate: {
        len: {
          args: [10,10],
          msg: "phone must be 10 digit long"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate : {
        isEmail : true
      }
    },
    occupation:{
      type: DataTypes.STRING,
    },
    address:{
      type: DataTypes.STRING,
    }


  }, {
    sequelize,
    modelName: 'User',
    timestamps:false
  });
  User.beforeCreate((user)=>{
    const encryptedPassword = bcrypt.hashSync(user.password , SALT);
    user.password = encryptedPassword; 
  })
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/secure')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Blog, {
        foreignKey: "userId"
      })
      User.hasMany(models.Comment, {
        foreignKey: "userId"
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required"
        },
        notEmpty: {
          msg: "Username is required"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        isEmail: {
          msg: "Invalid email format"
        },
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
      }
    },
    role: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};
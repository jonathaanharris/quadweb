'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "userId"
      });

      Comment.belongsTo(models.Blog, {
        foreignKey: "blogId"
      });
      // define association here
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXt,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Text is required"
        },
        notEmpty: {
          msg: "Text is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
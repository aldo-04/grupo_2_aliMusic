'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.belongsTo(models.Type)
    }
  };
  Post.init({
    postName: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    description: DataTypes.STRING,
    userNameId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
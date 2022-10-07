'use strict';
const { Long } = require('mongodb');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User,{foreignKey:"userId", as: "user"})
    }
    toJSON(){
      return {...this.get(),id:undefined,userId: undefined}
    }
  }
  blogs.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageType: DataTypes.STRING,
    // imageName: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    // imageData: DataTypes.BLOB
  }, {
    sequelize,
    tableName:'blogs',
    modelName: 'blogs',
  });
  return blogs;
};
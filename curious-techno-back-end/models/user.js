'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({blogs}) {
      // define association here
      this.hasMany(blogs,{foreignKey:"userId",as:"blogs"})
    }
    toJSON(){
      return {...this.get(),id:undefined}
    }
  }
  User.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"User Enter Name"},
        notEmpty:{msg:"User Name not Epmty"}
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"User Most have email"},
        notEmpty:{msg:"email not Epmty"},
        isEmail:{msg:"Enter Valid Email address"}
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"User Most Enter Password"},
        notEmpty:{msg:"role not Epmty"}
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"User Most Enter role"},
        notEmpty:{msg:"role not Epmty"}
      }
    },
    mobile: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"User Most Enter mobile Number"},
        notEmpty:{msg:"role not Epmty"}
      }
    },
    otp: {
      type:DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING
    },
    expiration_time: {
      type: DataTypes.DATE,
    },
  }, 
  {
    sequelize,
    tableName:"users",
    modelName: 'User',
  },
  { timestamps: false, freezeTableName: true }
);
  return User;
};
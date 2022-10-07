const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const md5 = require('md5')
require("dotenv").config();


const successData = (res, data, code = 200) => {
  return res.status(code).json(data);
};

const errorData = (res, data, code) => {
  return res.status(code ? code : 500).json(data);
};

const getHash = (str) => {
    const salted = process.env.SALT_STRING + str;
    return md5(salted);
  };

  const generateToken = (uuid) => {
    let payLoad = {
      user: {
        id: uuid,
      },
    };
    return jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {
      expiresIn: 900,
    });
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };
  
  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  };
module.exports ={
    successData,
    errorData,
    getHash,
    generateToken,
    generateOTP,
    addMinutes
}
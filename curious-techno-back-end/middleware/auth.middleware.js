const jwt = require("jsonwebtoken");
const { errorData } = require("../utils/utils");

const verifyToken = async (req, res, next) => {
  //   const token = req.header("x-auth-token");
  // console.log(req.body)
  const beareHeader = req.headers["authorization"];
  console.log("<<<<DONE>>>>",beareHeader)
  if (typeof beareHeader !== "undefined") {
    const bearer = beareHeader.split(" ");
    const bearerToken = bearer[1];
    if (!bearerToken)
        return errorData(res, { msg: "No token, authorization denied" });
    try {
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
      req.user = decoded.user;
      next();
    } catch (error) {
      errorData(res, { msg: "Token is not valid" });
    }
  }else{
    return errorData(res, { msg: "No, authorization denied" });
  }
};
module.exports = verifyToken;

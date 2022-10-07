const models = require('../models')
const { post, get } = require('../routes/blogRoutes')
var Sequelize = require("sequelize");
const { successData, errorData, getHash, generateToken, generateOTP, addMinutes } = require('../utils/utils')
const Op = Sequelize.Op;


const getAllUsers = async (req, res) => {
    try {
        const users = await models.User.findAll()
        console.log(users)
        // res.render('index',{title:'All User Data',users: users})
        return successData(res, { data: users });
    }
    catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" });
    }
}

const newUser = (req, res) => {
    res.render('create_user', { title: 'Create New User' })
}

const createUser = async (req, res) => {
    try {
        const { username, email, role, mobile } = req.body;

        const emailId = await models.User.findOne({
            where: {
                email: email,
            },
        });
        const mobileNo = await models.User.findOne({
            where: {
                mobile: mobile,
            },
        });

        if (emailId) {
            console.log(emailId);
            return errorData(res, { msg: "Email already exist" });
        }
        if (mobileNo) {
            return errorData(res, { msg: "Mobile no already exist" });
        }

        const encryptPass = await getHash(req.body.password);
        const user = await models.User.create({ username, email, password: encryptPass, role, mobile })
        // res.redirect('/login')
          return successData(res, { message: "Successfully created", redirect:"/login", data: user })
    }
    catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" }, "error", 500);
    }
}

const getUser = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await models.User.findOne(
            {
                where: { uuid },
                include: "blogs"
            }
        );
        // res.render('user_details', { user: user, title: "User Details" })
          return successData(res, { message: "Successful Get User Data", userData: user}, )
    }
    catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" }, "error", 500);
    }
}

const editUser = async (req, res) => {
    const uuid = req.params.uuid;
    const { username, email, role, mobile} = req.body;
    try {
        const user = await models.User.findOne({ where: { uuid } });
        user.username = username;
        user.email = email;
        user.role = role;
        user.mobile = mobile;
        const encryptPass = await getHash(req.body.password);

        user.password = encryptPass
        await user.save();
        // res.json({  });
        return successData(res, { message: "Successful Updated", user:user})
        // return res.json(user);
    }
    catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" }, "error", 500);
    }
}


const userDelete = async (req, res) => {

    try {
        const uuid = req.params.uuid;
        const user = await models.User.findOne({ where: { uuid }, });
        user.destroy();
        return successData(res, { message: "Successful Updated", redirect: '/users'}, "success", 200)
       
    }
    catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" }, "error", 500);
    }
}

const loginUser = async (req, res) => {
    const { email, password} = req.body;
    const encryptPass = getHash(password)
    try {
        let userData = await models.User.findOne(
            {
                where: {
                    [Op.or]: [{ email: email }, { mobile: email }],
                }
            }
        )
        if (!userData) errorData(res, { message: "Invalid credentials" });

        if (encryptPass !== userData.password) {
            return errorData(res, { message: "Invalid credentials" });
        }
        
        const accessToken = generateToken(userData.uuid);
            // res.redirect('/users/blogs/allBlogs');
        userData.token = accessToken;
        await userData.save()
        return successData(res, { token: accessToken, redirect: 'users/blogs/allBlogs',userData:userData });

    }
    catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" }, "error", 500);
    }

}

const logoutUser = async (req, res) => {
    const uuid = req.params.uuid;
    console.log(uuid)
    try {
        const user = await models.User.findOne({ where: { uuid } });
        user.token = null;
        await user.save();
        console.log(user)
        return successData(res, { msg: "Successful Logout", redirect: `/`});
    }
    catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" }, "error", 500);
    }
}
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log(email, otp)
    const encryptOTP = getHash(otp)
    try {
        let userData = await models.User.findOne(
            {
                where: {
                    [Op.or]: [{ email: email }, { mobile: email }],
                }
            }
        )
        if (!userData) errorData(res, { message: "Invalid credentials" });

        if (encryptOTP !== userData.otp) {
            return errorData(res, { message: "Invalid credentials" });
        }
        //  res.redirect('/login');
        return successData(res, userData.uuid);

    }
    catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" }, "error", 500);
    }

}

const sendLoginOTP = async (req, res) => {
    try {
        const { email } = req.body;
        let userData = await models.User.findOne({
            where: {
                [Op.or]: [{ email: email }, { mobile: email }],
            },
        });
        if (!userData)
            return errorResponse(res, { msg: "Email or Mobile no not exist" });

        let otpCode = await generateOTP();
        const now = new Date();
        const expiryTime = await addMinutes(now, 1);
        const encryptOTP = await getHash(otpCode.toString());
        userData.otp = encryptOTP;
        userData.expiration_time = expiryTime;
        await userData.save();
        console.log(otpCode);

        return successData(res, { msg: "otp was successfully sent." });
    } catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" });
    }
};

const resetPassword = async (req, res) => {
    const uuid = req.params.uuid;
    const { password } = req.body;
    const encryptPass = getHash(password);
    try {
        const userData = await models.User.findOne({ where: { uuid } });
        userData.password = encryptPass;

        await userData.save();
        // res.redirect('/login')
           return successData(res, { redirect: "/login" });
    }
    catch (err) {
        console.log(err);
        return errorData(res, { msg: "Internal server error" }, "error", 500);
    }
}


module.exports = {
    getAllUsers,
    getUser,
    newUser,
    createUser,
    editUser,
    userDelete,
    loginUser,
    logoutUser,
    sendLoginOTP,
    verifyOTP,
    resetPassword
}
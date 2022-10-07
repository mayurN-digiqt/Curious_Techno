const express = require('express')
const userController = require('../controller/user.controller')  
const router = express.Router()
const verifyToken = require('../middleware/auth.middleware')

// User Routes
// router.get('/create',userController.newUser)

router.post('/', userController.createUser)

router.post('/loginUser', userController.loginUser)

router.get('/logoutUser/:uuid', userController.logoutUser)

router.get('/:uuid', verifyToken, userController.getUser)

router.post('/send-otp', userController.sendLoginOTP)

router.post('/verify-otp', userController.verifyOTP)

router.put('/resetPassword/:uuid', userController.resetPassword)

// router.get('/', userController.getAllUsers);     

// router.delete('/:uuid',userController.userDelete)

router.put('/:uuid', verifyToken,userController.editUser)

module.exports = router;
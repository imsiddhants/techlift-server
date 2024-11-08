const express = require('express')
const userController = require('../controllers/user-controller.js')
const { signup, login, logout, verifyToken } = userController
const userAuth = require('../middlewares/user-auth')

const router = express.Router()

//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup);

//login route
router.post('/login', login );
router.post('/logout', logout )
router.get('/verify-token', verifyToken )



module.exports = router
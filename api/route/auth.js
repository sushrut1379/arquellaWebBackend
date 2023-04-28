const express = require('express');
const loginController = require('../../controllers/auth/loginController');
const router = express.Router();
const registerController = require('../../controllers/auth/registerController');
const userController = require('../../controllers/auth/userController');
const auth = require("../../middlewares/auth")
const refreshTokenController = require('../../controllers/auth/refreshTokenController')
const logoutController = require('../../controllers/auth/logOutController')

router.post('/register', registerController.register)
router.post('/login', loginController.login)
router.post('/logout', logoutController.logout)
router.get('/me',auth, userController.me)
router.post('/refresh', refreshTokenController.refreshToken);





module.exports = router;
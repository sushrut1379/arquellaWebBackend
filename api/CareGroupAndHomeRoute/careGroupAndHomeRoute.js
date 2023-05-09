

const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/auth/registerController');
const {getCareGroupCareHome} = require('../../controllers/careGroupCareHomeController/careGroupCareHomeController')
const auth = require("../../middlewares/auth")

router.post('/caregroupandhomes', auth , getCareGroupCareHome)




module.exports = router;
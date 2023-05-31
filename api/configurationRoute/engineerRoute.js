

const express = require('express');
const router = express.Router();
const auth = require("../../middlewares/auth");
const { setAndroideLicenseController ,addUserRole ,getAndroideLicenseController} = require('../../controllers/configurationController/engineerConfigCountroller');


router.post('/setlicense', auth , setAndroideLicenseController)
router.get('/getlicense', auth , getAndroideLicenseController)
router.post('/adduserrole', auth , addUserRole)


module.exports = router;
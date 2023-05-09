


const express = require('express');
const router = express.Router();
const auth = require("../../middlewares/auth")
const {addCallController } = require('../../controllers/callController/callController')

router.post('/addcall', auth , addCallController);




module.exports = router;

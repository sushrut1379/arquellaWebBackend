
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require('../../utils/ErrorHandler')
const CareGroup = require('../../models/careGroupModel')
const CareHome = require('../../models/careHomeModel')

const getCareGroupCareHome = catchAsyncErrors(async(req, res, next) => {
    console.log("+++", req.user);
    let careGroup = await CareGroup.findOne({ where: { managerEmail:req.user.email } })

    let careHome = await CareHome.findOne({ where: { managerEmail:req.user.email } })
    console.log("cp res" , careGroup);
    //test commit
    // let {email, password} = req.body
    // if(!email || !password) {
    //     return next(new ErrorHandler('Please enter email & password', 400))
    // }
    

    res.status(200).json({
        working: 'care group and care home successfully',
        careGroupOfManager:careGroup,
        careHomeOfManager:careHome
     
    })
})



module.exports = {
    getCareGroupCareHome,

}

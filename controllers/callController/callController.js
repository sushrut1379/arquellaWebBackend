
const CallModel = require('../../models/callModels/callModel');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const ErrorHandler = require('../../utils/ErrorHandler')



const addCallController =
    catchAsyncErrors(async (req, res, next) => {
        console.log("block runni++++n", req.body);

        if (req.body == undefined) {
            console.log("block runnin", req.body);
            throw next(new ErrorHandler('add request body+++ or payload', 200));
        }

      

        console.log("req body", req.body);

        let {
            roomCode,
            uid,
            alertType,
            startTime,
            endTime,
            duration,
            clearType,
            year,
            month,
            day,
            zone,
            roomName,
            carer,
            serverRef,
            clearUid,
            careGroup,
            siteName,
            carehome
        } = req.body;

        await CallModel.create({
            roomCode,
            uid,
            alertType,
            startTime,
            endTime,
            duration,
            clearType,
            year,
            month,
            day,
            zone,
            roomName,
            carer,
            serverRef,
            clearUid,
            careGroup,
            siteName,
            carehome
        }).catch(err => {
            console.log("error in caregroup", err);
            // if (err) {
            //     User.destroy({ where: { email: userEmailAddress } })
            // }
            throw next(new ErrorHandler('There\'s an issue in call modelfields', 500))
        })


        console.log('call controller hitted', req.user);
        res.status(200).json({ message: 'Call Data save successfully' })

    });









module.exports = { addCallController, };
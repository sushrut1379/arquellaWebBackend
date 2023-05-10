const { default: CustomErrorHandler } = require("../../service/customErrorHandler")
const sequelize = require("../../DataBase/dataBase");

const ErrorHandler = require('../../utils/ErrorHandler')
const User = require("../../models/modalsArquella");
const CareGroup = require('../../models/careGroupModel')
const CareHome = require('../../models/careHomeModel')
const JwtService = require('../../service/jwtService')
const bcrypt = require('bcrypt')
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const RefreshToken = require("../../models/refreshTokenModel");

const registerController = catchAsyncErrors(async (req, res, next) => {
    console.log("req body", req.body);
    let {
        careGroupName,
        careGroupEmail,
        careHomename,
        careGroupAddress,
        careHomeAddress,
        careGroupCity,
        careGroupCountry,
        careHomeContactNo,
        careHomeEmail,
        numberOfZonesInCareHome,
        NumberOfCommunityRoomsInCareHome,
        NumberOfRoomsInCareHome,
        careHomeNumberOfEnSuitesInCareHome,
        noOfHomes,
        userEmailAddress,
        password

    } = req.body;

    //below is request payload send from react.....
    data = {
        "careGroupName": "tata ind",
        "careHomename": "mahindra ",
        "careGroupAddress": "shanti nagar bsl",
        "careHomeAddress": "shanti nagar bsl",
        "careGroupCity": "bhusawal",
        "careGroupCountry": "India",
        "careGroupContactNo": "2514145",
        "careGroupEmail": "susrhut@gmail.com",
        "careHomeCity": "bhusawal",
        "careHomeCountry": "India",
        "careHomeContactNo": "25141452",
        "careHomeEmail": "susrhut@gmail.com",
        "numberOfZonesInCareHome": "10",
        "NumberOfCommunityRoomsInCareHome": "10",
        "NumberOfRoomsInCareHome": "10",
        "careHomeNumberOfEnSuitesInCareHome": "10",
        "userEmailAddress": "test@gmail.com",
        "password": "test@123",
        "noOfHomes": "10"
    }

    // let { email, password, role, careGroupName, careGroupAddress, mobile, noOfCareHomes,
    //       careHomeName, careHomeAddress, rooms, zones, enSuites, managerName   } = req.body

    let user = await User.findOne({ where: { email: userEmailAddress } });
    if (user)
        return next(new ErrorHandler('Email already taken', 400))
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hash pass", hashedPassword)
    user = await User.create({ email: userEmailAddress, password: hashedPassword, })

    await CareGroup.create({
        careGroupName,
        address: careGroupAddress,
        mobile: careHomeContactNo,
        email: careGroupEmail,
        careHomes: noOfHomes,
        managerEmail:userEmailAddress
    }).catch(err => {
        console.log("error in caregroup" , err);
        if (err) {
            User.destroy({ where: { email: userEmailAddress } })
            throw next(new ErrorHandler('There\'s an issue in Care group fields', 400))
        }
    })

    await CareHome.create({
        careHomeName:careHomename,
        address: careHomeAddress,
        mobile: careHomeContactNo,
        email: careHomeEmail,
        careGroup: careGroupName,
        rooms: NumberOfRoomsInCareHome,
        zones: numberOfZonesInCareHome,
        enSuites: careHomeNumberOfEnSuitesInCareHome,
        managerEmail:userEmailAddress
    }).catch(err => {
        if (err) {
            console.log('error ' , err);
            User.destroy({ where: { email: userEmailAddress } })
            CareGroup.destroy({ where: { email: careGroupEmail } })
            throw next(new ErrorHandler('There\'s an issue in Care home fields', 400))
        }
    })
    let access_token = JwtService.sign({ _id: user.dataValues.id, role: user.dataValues.role })
    let refresh_token = JwtService.sign({ _id: user.dataValues.id, email: user.dataValues.email, role: user.dataValues.role }, '1y', process.env.JWT_SECRET);
    await RefreshToken.create({ userId: user.dataValues.id, email: user.dataValues.email, refreshToken: refresh_token })
    res.status(200).json({ message: 'User created successfully', access_token: access_token })
})

module.exports = registerController;
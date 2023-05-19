
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require('../../utils/ErrorHandler')
const db = require('../../models')
const CareGroup = db.careGroup;
const CareHome = db.careHome;
const User = db.user;
const applicationUser_careGroups = db.applicationUser_careGroups


const getUsers = catchAsyncErrors(async (req, res, next) => {
    const { user_email_address} = req.body
    console.log("+++hited", req.user , user_email_address);

    // let user = await User.findOne({ where: { user_email_address: care_home_manager_email } });
  
    // if (user === null) {
    //     throw next(new ErrorHandler('manager email is not present in ApplicationUser DataBasse before this regiter using this email', 400))
    // }

    const careGroups = await CareGroup.findAll({ include: User });
    
    const users = await User.findAll({ include: CareGroup }).catch(err => {
        if (err) {
            console.log('err in caregoup if', err);
            //this step get us sequalise error statuse code and type of error
            ErrorHandler.handleSequelizeError(err);
            // throw next(new ErrorHandler('There\'s an issue in Care group fields'+err.parent, 400))
            throw next(new ErrorHandler(ErrorHandler.handleSequelizeError(err).getErrorMessage, ErrorHandler.handleSequelizeError(err).getStatusCode));
        }
    })

    
    res.status(200).json({
        message: 'user Data with caregroups',
        data:  users,
        careGroup: careGroups
       
    })

  
   

  
})


let CareHomeData = {
    "care_home_name": "Example Care Home",
    "care_home_address": "123 Care Home Street",
    "care_home_contact_no": "123-456-7890",
    "care_home_email": "carehome@example.com",
    "care_home_city": "Example City",
    "care_home_country": "Example Country",
    "number_of_rooms_in_care_home": 50,
    "number_of_zones_in_care_home": 3,
    "number_of_en_suites_in_care_home": 20,
    "number_of_community_rooms_in_care_home": 2,
    "care_home_manager_email": "manager@example.com",
    "careGroup_id": 1,
    "care_group_name": "Example Care Group"
}


const addCareHomeController = catchAsyncErrors(async (req, res, next) => {
    let {
        care_home_name,
        care_home_address,
        care_home_contact_no,
        care_home_email,
        care_home_city,
        care_home_country,
        number_of_rooms_in_care_home,
        number_of_zones_in_care_home,
        number_of_en_suites_in_care_home,
        number_of_community_rooms_in_care_home,
        care_home_manager_email,
        careGroup_id,
        care_group_name
    } = req.body

    console.log("addcarehome controller", req.body);

    let user = await User.findOne({ where: { user_email_address: care_home_manager_email } });
    let careGroup = await CareGroup.findOne({ where: { care_group_name: care_group_name } });
  
    if (user === null) {
        throw next(new ErrorHandler('manager email is not present in ApplicationUser DataBasse before this regiter using this email', 400))
    }
    if (careGroup === null) {
        throw next(new ErrorHandler('Care Group name is not present in CareGroup DataBasse regiter using this Care Group Name', 400));
    }


    //this code is to avoide primary key increament....................
    const maxPrimaryKey = await CareHome.max('id');
    const newPrimaryKey = (maxPrimaryKey || 0) + 1;


    let careHome = await CareHome.create({
        id:newPrimaryKey,
        care_home_name,
        care_home_address,
        care_home_contact_no,
        care_home_email,
        care_home_city,
        care_home_country,
        number_of_rooms_in_care_home,
        number_of_zones_in_care_home,
        number_of_en_suites_in_care_home,
        number_of_community_rooms_in_care_home,
        care_home_manager_email: user.dataValues.user_email_address,
        care_group_name: careGroup.dataValues.care_group_name,
        careGroup_id: careGroup.dataValues.id
    }).catch(err => {
        console.log('err in caregoup', err);

        if (err) {
            console.log('err in carehome if', err);
            throw next(new ErrorHandler('There\'s an issue in Care home fields' + err.parent, 400))
        }
    })




    res.status(200).json({
        message: 'Care Home added sucessfully',
        careHome: careHome
    })
})



//add careHomes constroller convetional way

const addCareHomeController2 = {
    async addCareHomeController2(req, res, next) {
        try {
            let {
                care_home_name,
                care_home_address,
                care_home_contact_no,
                care_home_email,
                care_home_city,
                care_home_country,
                number_of_rooms_in_care_home,
                number_of_zones_in_care_home,
                number_of_en_suites_in_care_home,
                number_of_community_rooms_in_care_home,
                care_home_manager_email,
                careGroup_id,
                care_group_name
            } = req.body
        
            console.log("addcarehome controller", req.body);
        
            let user = await User.findOne({ where: { user_email_address: care_home_manager_email } });
            let careGroup = await CareGroup.findOne({ where: { care_group_name: care_group_name } });
           
            let careHome = await CareHome.create({
                care_home_name,
                care_home_address,
                care_home_contact_no,
                care_home_email,
                care_home_city,
                care_home_country,
                number_of_rooms_in_care_home,
                number_of_zones_in_care_home,
                number_of_en_suites_in_care_home,
                number_of_community_rooms_in_care_home,
                care_home_manager_email: user.dataValues.user_email_address,
                care_group_name: careGroup.dataValues.care_group_name,
                careGroup_id: careGroup.dataValues.id
            }, { validate: false } ).catch(err => {
                console.log('err in caregoup', err);
        
                if (err) {
                    console.log('err in carehome if', err);
                    throw next(new ErrorHandler('There\'s an issue in Care home fields' + err.parent, 400))
                }
            })

            res.status(200).json({
                message: 'Care Home added sucessfully',
                careHome: careHome
            })
           
        } catch(err) {
           return next(err);
        }
    }
}



const getCareGroupController = catchAsyncErrors(async (req, res, next) => {
    let { care_group_id } = req.body
    console.log("get craregrupu ctrl hitted", care_group_id);

    let careGroup = await CareGroup.findByPk(care_group_id);

    if (careGroup === null) {
        throw next(new ErrorHandler('Care Group is not present in CareGroup DataBasse regiter using this Care Group', 400));
    }
  

   let careGroupByName= await CareGroup.findByPk(care_group_id ,{
        include: [
            { model: CareHome, as: 'careHomes' }
        ]
    }).catch(err => {
        if (err) {
            console.log('err in caregoup if', err);
            //this step get us sequalise error statuse code and type of error
            ErrorHandler.handleSequelizeError(err);
            // throw next(new ErrorHandler('There\'s an issue in Care group fields'+err.parent, 400))
            throw next(new ErrorHandler(ErrorHandler.handleSequelizeError(err).getErrorMessage, ErrorHandler.handleSequelizeError(err).getStatusCode));
        }
    })

    
    res.status(200).json({
        message: 'Care Group Data',
        data:  careGroupByName
    })
})


module.exports = {
    getUsers,
    addCareHomeController,
    getCareGroupController,
    addCareHomeController2

}

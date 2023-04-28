
const sequelize = require("../../DataBase/dataBase");
const { RefreshToken } = require('../../models/refreshTokenModel')


const logoutController = {
    async logout(req, res, next) {
        console.log('logout body', req.body)
        console.log('logout form body', req.body.email)


        try {

            await RefreshToken.destroy({
                where: { email: req.body.email },
            });

            res.status(200).json({
                working: 'logout Sucessfully',
             
            })
        
        } catch (err) {
            return next(err);
        }

        // res.status(200).json({
        //     working: 'register working from controller',
        //     reqq: req.body,

        //     access_token: access_token
        // })

    }
}

module.exports = logoutController;
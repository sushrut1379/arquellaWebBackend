const { default: CustomErrorHandler } = require("../../service/customErrorHandler")
const sequelize = require("../../DataBase/dataBase");


const { User } = require("../../models/modalsArquella");
const JwtService = require('../../service/jwtService')
const bcrypt = require('bcrypt')

const registerController = {
    async register(req, res, next) {
        console.log('register body', req.body)
        console.log('email form body', req.body.email)

        const user = await User.findOne({ where: { email: req.body.email } });
        if (user === null) {
            console.log('Not found!');
        } else {
            console.log(user instanceof User); // true
            console.log(user.email); // 'My Title'
            return res.send('This email is already taken.');
        }
     

        const { email, password, role } = req.body;
        console.log("pass", password)

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hash pass", hashedPassword)

        console.log("new user ++++", email, hashedPassword)
        let access_token;
        try {
            console.log("new user +++*****+", email, hashedPassword)
            await sequelize
                .sync({ force: false })
                //   .sync()
                .then((result) => {
                    User.create({ email: email, password: hashedPassword, role:role });
                    access_token = JwtService.sign({ _id: result.id, role: result.role });
                    res.status(200).json({
                        working: 'register working from controller',
                        reqq: req.body,
                        userFordb: result,
                        access_token: access_token
                    })
                    console.log("swquel in ", result);
                })

                .catch((err) => {
                    console.log(err);
                });

            //Json web token 
            //access_token = JwtService.sign({ _id: result._id, role: result.role });


        } catch (err) {
            return next(err);
        }

        res.status(200).json({
            working: 'register working from controller',
            reqq: req.body,

            access_token: access_token
        })

    }
}

module.exports = registerController;
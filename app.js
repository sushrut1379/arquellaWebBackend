const express = require('express');
const router = express.Router();
const app = express();
const sequelize = require("./DataBase/dataBase");
const RefreshToken = require('./models/refreshTokenModel')
const User = require ('./models/modalsArquella')



// const bodyParser = require('body-Parser');
var mongoose = require('mongoose');
const mainRouter = require('./api/route/main');
const authRouter = require("./api/route/auth");
const manageUserRouter = require("./api/route/manageUser");
const careGroupCareHomeControllerRouter = require('./api/CareGroupAndHomeRoute/careGroupAndHomeRoute');

var cors = require('cors');


mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://sushrutmahajan:Sushrut123@cluster0.2wvkj.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//console.log(db.on('error', console.error.bind(console, 'connection error:')))
db.once('open', () => {
  console.log('DB connected...!!!!!!!!!');
});

// User.sync({ force : false });
// RefreshToken.sync({ force : false });

sequelize.sync({ force: false }).then(() => {
  console.log('Table synchronized ***');
});


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://fuzzy-getup-moth.cyclic.app")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
});

// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin" ,'*');
//   res.header("Access-Control-Allow-Headers" ,'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader( "Access-Control-Allow-Methods", "*" );
//   next();
// })

app.use('/main', mainRouter);
app.use('/auth', authRouter);
app.use('/users', manageUserRouter);
app.use('/care', careGroupCareHomeControllerRouter);



app.use('/', (req, res, next) => {

  console.log('this controller is hitted')
  res.status(404).json({

    error: 'page is not found 404 error and you hitted wrong url'
  })
})


module.exports = app;
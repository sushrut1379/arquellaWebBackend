const http =  require('http');
const app = require('./app');
const server = http.createServer(app);
const errorMiddleware = require('./middlewares/Error')
const User = require ('./models/modalsArquella')
const CareGroup = require('./models/careGroupModel')
const CareHome = require('./models/careHomeModel')
const RefreshToken = require('./models/refreshTokenModel')
const CallModel = require('./models/callModels/callModel');

User.sync({force: false})
CareGroup.sync({force: false})
CareHome.sync({force: false})
RefreshToken.sync({force: false})
CallModel.sync({force: false})

server.listen(process.env.PORT , console.log('server is started at 3007'))
app.use(errorMiddleware)
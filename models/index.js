
const { Sequelize, DataTypes } = require('sequelize')


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    logging: false,
    dialect: 'mysql'
})
try {
    sequelize.authenticate()
    console.log('Connection has been established successfully db connect using index file')
} catch (error) {
    console.error('Unable to connect to the database', error)
}

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.user = require('./modalsArquella')(sequelize, DataTypes)
db.careGroup = require('./careGroupModel')(sequelize, DataTypes)
db.careHome = require('./careHomeModel')(sequelize, DataTypes)
db.refreshToken = require('./refreshTokenModel')(sequelize, DataTypes)
db.callHistory = require('./callModels/callModel')(sequelize, DataTypes)
db.applicationUser_careGroups = require('./relationShipsTable/applicationUser_careGroupModel')(sequelize, DataTypes)


//one to  many between application user and caregroups
// db.user.hasOne(db.careGroup, {
//     foreignKey: "applicationUsers_id"
// })

// db.careGroup.belongsTo(db.user, {
//     foreignKey: "applicationUsers_id"
// })


//many to many between application users and caregroups
// In User model
db.user.belongsToMany(db.careGroup, {
    through: db.applicationUser_careGroups,
    foreignKey: 'applicationUsers_id', // Customize the foreign key name for User model
    otherKey: 'careGroup_id', // Customize the foreign key name for Group model
    uniqueKey: 'my_custom_unique' 
});

// In Group model
db.careGroup.belongsToMany(db.user, {
    through: db.applicationUser_careGroups,
    foreignKey: 'careGroup_id', // Customize the foreign key name for Group model
    otherKey: 'applicationUsers_id', // Customize the foreign key name for User model
    uniqueKey: 'my_custom_unique' 
});

// db.user.hasOne(db.refreshToken)

// db.refreshToken.belongsTo(db.user)

db.careGroup.hasMany(db.careHome, {
    foreignKey: "careGroup_id"
})

db.careHome.belongsTo(db.careGroup, {
    foreignKey: "careGroup_id"
})

db.careHome.hasMany(db.callHistory, {
    as: 'callHistory',
    foreignKey: 'careHome_id'
})

db.callHistory.belongsTo(db.careHome, {
    foreignKey: "careHome_id"
})


db.sequelize.sync({ force: false })

module.exports = db
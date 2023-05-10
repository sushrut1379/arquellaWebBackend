const { DataTypes } = require('sequelize')
const sequelize = require('../DataBase/dataBase')

//testing commit
const CareHome = sequelize.define('carehome', {
    careHomeName: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            len: {
                args: [3, 15],
                msg: 'Please enter a valid name'
            }
        },
    },
   
	careGroup: {
		type: DataTypes.STRING,
		allowNull: false
	},
    email: {
        type: DataTypes.STRING,
        // unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Please enter a valid email'
            }
        },
    },
    mobile: {
        type: DataTypes.STRING,
        // unique: true,
        allowNull: false,
        validate: {
          len: {
            args : [6, 13],
            msg : 'Please enter a valid number'
          } 
        },
    },
    address: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Please enter a valid address'
            }
        },
        allowNull: false,
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    zones: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    enSuites: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    managerEmail: {
        type: DataTypes.STRING
    },
    
    }, {
        tableName: 'CareHomes'
    }
)

module.exports = CareHome
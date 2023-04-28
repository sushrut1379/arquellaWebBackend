
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../DataBase/dataBase");


//user modal

const RefreshToken = sequelize.define("refreshToken", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    }
});



module.exports = { RefreshToken };

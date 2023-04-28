const { Sequelize, DataTypes } = require('sequelize');

//sequalize ...........
const sequelize = new Sequelize('sushrut', 'testuser', 'testuser', {
    host: '35.205.100.172',
    dialect:  'mysql' ,
  });
  
  try {
   sequelize.authenticate();
    console.log('Connection has been established successfully+-+- using sequalizee.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = sequelize;
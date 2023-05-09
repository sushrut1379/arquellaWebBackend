const { DataTypes } = require('sequelize')
const sequelize = require('../../DataBase/dataBase')





// response body for below scema
callDataEg = {
    "roomCode": "A101",
    "uid": "123456",
    "alertType": "call",
    "startTime": "2023-05-04 09:00:00",
    "endTime": "2023-05-04 09:10:00",
    "duration": "600",
    "clearType": "clear",
    "year": "2023",
    "month": "05",
    "day": "04",
    "zone": "Zone A",
    "roomName": "Room 101",
    "carer": "John Smith",
    "serverRef": "789012",
    "clearUid": "654321",
    "careGroup": "Group A",
    "siteName": "Site X",
    "carehome": "Care Home Y"
}

const CallModel = sequelize.define('callmodel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomCode: {
        type: DataTypes.STRING
    },
    uid: {
        type: DataTypes.STRING
    },
    alertType: {
        type: DataTypes.STRING
    },
    startTime: {
        type: DataTypes.STRING
    },
    endTime: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.STRING
    },
    clearType: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.STRING
    },
    month: {
        type: DataTypes.STRING
    },
    day: {
        type: DataTypes.STRING
    },
    zone: {
        type: DataTypes.STRING
    },
    roomName: {
        type: DataTypes.STRING
    },
    carer: {
        type: DataTypes.STRING
    },
    serverRef: {
        type: DataTypes.STRING
    },
    clearUid: {
        type: DataTypes.STRING
    },
    careGroup: {
        type: DataTypes.STRING
    },
    siteName: {
        type: DataTypes.STRING
    },
    carehome: {
        type: DataTypes.STRING
    }


}, {
    tableName: 'CallTable'
}
)

module.exports = CallModel
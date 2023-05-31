
module.exports = (sequelize, DataTypes) => {
    const androidLicense = sequelize.define('androidLicense', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        androidLicense_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        careGroup_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        careHomes_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        site_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        issue_date: {
            type: DataTypes.DATE
        },
        active_subscription: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        config_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        api_endpoint: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {
        tableName: 'androidLicense'
    })
    return androidLicense
}


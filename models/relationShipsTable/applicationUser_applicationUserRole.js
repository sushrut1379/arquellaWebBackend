

module.exports = (sequelize, DataTypes) => {
    const applicationUsers_applicationUsersRole = sequelize.define('applicationUsers_applicationUsersRole', {
        applicationUsers_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'applicationUsers', // Replace with the actual table name for User model
                key: 'id',
            },
        },
        applicationUsersRole_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'applicationUsersRole', // Replace with the actual table name for Group model
                key: 'id',
            },
        },
    },
        {
            sequelize,
            modelName: 'applicationUsers_applicationUsersRole',
            timestamps: false, // Disable timestamps for junction tables
        },
        // {
        //     tableName: 'applicationUser_careGroup'
        // }
    )
    return applicationUsers_applicationUsersRole
}
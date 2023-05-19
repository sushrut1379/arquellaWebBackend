

module.exports = (sequelize, DataTypes) => {
    const applicationUser_careGroup = sequelize.define('applicationUser_careGroup', {
        applicationUsers_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'applicationUsers', // Replace with the actual table name for User model
                key: 'id',
            },
        },
        careGroup_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'careGroups', // Replace with the actual table name for Group model
                key: 'id',
            },
        },
    },
        {
            sequelize,
            modelName: 'applicationUser_careGroup',
            timestamps: false, // Disable timestamps for junction tables
        },
        // {
        //     tableName: 'applicationUser_careGroup'
        // }
    )
    return applicationUser_careGroup
}
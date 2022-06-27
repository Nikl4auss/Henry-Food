const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('diet', {
        ID:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
    )
}
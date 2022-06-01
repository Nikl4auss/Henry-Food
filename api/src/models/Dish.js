const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('dish', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}
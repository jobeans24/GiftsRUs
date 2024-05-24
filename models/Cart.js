const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        giftIds: {
            type: DataTypes.JSON, // store gift id and quanity as json object
            allowNull: true
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'cart',
    }
);

module.exports = Cart;   
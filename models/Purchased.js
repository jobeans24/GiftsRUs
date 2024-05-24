const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

Purchased.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },
        },
        eventId: {
            type: DataTypes.INTEGER,
            references: {
                model: Event,
                key: 'id'
            },
        },
        giftIds: {
            type: DataTypes.JSON, // store gift id and quanity as json object
            allowNull: true
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'purchased',
    }
);

module.exports = Purchased;
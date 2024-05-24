const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        locationId: {
            type: DataTypes.INTEGER,
            references: {
                model: Location,  // points to the location table for the address associated to the event
                key: 'id'
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User, // points to the user that is the admin for the event
                key: 'id'
            },
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'event',
    }
);

module.exports = Event;                
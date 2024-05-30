const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        aptSuite: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                  args: [2, 2],
                  msg: "State code must be exactly 2 characters long",
                },
            },
        },
        zipCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'location',
    }
);

module.exports = Location;   
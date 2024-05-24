const { Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

// Import all models
const Event = require('./Event');
const Gift = require('./Gift');
const Location = require('./Location');
const Purchased = require('./Purchased');
const User = require('./User');
const Cart = require('./Cart');


// A User has one Cart
User.hasOne(Cart, {
    foreignKey: 'userId'
});

Cart.belongsTo(User, {
    foreignKey: 'userId'
});

// A User can have many Events
User.hasMany(Event, {
    foreignKey: 'userId'
});

Event.belongsTo(User, {
    foreignKey: 'userId'
});

// An Event belongs to a Location
Location.hasMany(Event, {
    foreignKey: 'locationId'
});

Event.belongsTo(Location, {
    foreignKey: 'locationId'
});

// A User can have many Purchased items
User.hasMany(Purchased, {
    foreignKey: 'userId'
});

Purchased.belongsTo(User, {
    foreignKey: 'userId'
});

// An Event can have many Purchased items
Event.hasMany(Purchased, {
    foreignKey: 'eventId'
});

Purchased.belongsTo(Event, {
    foreignKey: 'eventId'
});

// Export models and sequelize connection
module.exports = {
    Cart,
    Event,
    Gift,
    Location,
    Purchased,
    User,
    sequelize
};

const sequelize = require('../config/connection');
const { Event, Gift, Location, Purchased, Cart, User } = require('../models');

// bring in the json data for each table
const cartData = require('./cartData.json');
const eventData = require('./eventData.json');
const giftData = require('./giftData.json');
const locationData = require('./locationData.json');
const purchasedData = require('./purchasedData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    // the order of the first couplde of bulk creates is critical can't create a location or event without out having a user
    await User.bulkCreate(userData, { individualHooks: true });
    await Location.bulkCreate(locationData);
    await Event.bulkCreate(eventData);
    await Gift.bulkCreate(giftData);
    await Cart.bulkCreate(cartData, { individualHooks: true });
    await Purchased.bulkCreate(purchasedData);
  
  };
  
// removed the seeDatabase call and process.exit(0) from here  
// export the seed data so that it is available in the server.js file
module.exports = seedDatabase;  
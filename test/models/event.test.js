const SequelizeMock = require('sequelize-mock');
const EventModel = require('../../models/Event'); //import Event model

const DBConnectionMock = new SequelizeMock();

// location 
const LocationMock = DBConnectionMock.define('location', {
    id: 1,
    name: 'Event Location'
});

// user
const UserMock = DBConnectionMock.define('user', {
    id: 1,
    name: 'Test User 1'
});

// event
const EventMock = DBConnectionMock.define('event', {
    id: 1,
    name: 'Test Event',
    date: new Date(),
    type: 'Birthday',
    locationId: 1,
    userId: 1,
});

// Override the relationships
// use EventMock instead of EventModel
EventMock.belongsTo(LocationMock, { foreignKey: 'locationId' });
EventMock.belongsTo(UserMock, { foreignKey: 'userId' });

// creat an event
describe('Event Model', () => {
    it('create an event', async () => {
        const event = await EventMock.create({
            name: 'Test Event',
            date: new Date(),
            type: 'Birthday',
            locationId: 1,
            userId: 1,
        });

        expect(event.name).toBe('Test Event');
        expect(event.type).toBe('Birthday');
    });

    // test the location and user assocation
    it('associate location and user', async () => {
        const event = await EventMock.create({
            name: 'Another Event',
            date: new Date(),
            type: 'Wedding',
            locationId: 1,
            userId: 1,
        });

        const location = await event.getLocation();
        const user = await event.getUser();

        expect(location.name).toBe('Event Location');
        expect(user.name).toBe('Test User 1');
    });
});


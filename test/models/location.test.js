const { Sequelize, DataTypes } = require('sequelize');
const sequelizeMock = new Sequelize('sqlite::memory:'); // Use in-memory SQLite for tests
const Location = require('../../models/Location'); // Adjust the path if necessary

describe('Location Model', () => {
    beforeAll(async () => {
        // Initialize the model
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
                sequelize: sequelizeMock,
                freezeTableName: true,
                underscored: true,
                modelName: 'location',
            }
        );

        // Sync the model with the database
        await sequelizeMock.sync();
    });

    test('should create a valid Location model', async () => {
        const locationData = {
            street: '123 Main St',
            aptSuite: 'Apt 1',
            city: 'Ellicott City',
            state: 'MD',
            zipCode: 21042,
        };

        const location = await Location.create(locationData);
        expect(location.id).toBeDefined();
        expect(location.street).toBe(locationData.street);
        expect(location.aptSuite).toBe(locationData.aptSuite);
        expect(location.city).toBe(locationData.city);
        expect(location.state).toBe(locationData.state);
        expect(location.zipCode).toBe(locationData.zipCode);
    });

    test('should not allow a state code longer or shorter than 2 characters', async () => {
        await expect(
            Location.create({
                street: '123 Main St',
                city: 'Ellicott City',
                state: 'Maryland', // Invalid state length
                zipCode: 21042,
            })
        ).rejects.toThrow();
        
        await expect(
            Location.create({
                street: '123 Main St',
                city: 'Ellicott City',
                state: 'M', // Invalid state length
                zipCode: 21042,
            })
        ).rejects.toThrow();
    });

    test('should not allow null values for non-nullable fields', async () => {
        await expect(
            Location.create({
                street: null, // street should not be null
                city: 'Ellicott City',
                state: 'MD',
                zipCode: 21042,
            })
        ).rejects.toThrow();

        await expect(
            Location.create({
                street: '123 Main St',
                city: null, // city should not be null
                state: 'MD',
                zipCode: 21042,
            })
        ).rejects.toThrow();
    });
});

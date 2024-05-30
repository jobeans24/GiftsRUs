const SequelizeMock = require('sequelize-mock');
const GiftModel = require('../../models/Gift'); 

// Create a Sequelize instance using Sequelize Mock
const DBConnectionMock = new SequelizeMock();

// Define a mock Gift model
// with name and website null
const GiftMock = DBConnectionMock.define('gift', {
    id: 1,
    name: null, 
    price: 19.99,
    website: null,
    isCertificate: true,
});

describe('Gift Model', () => {
    it('create a gift with valid properties', async () => {
        const gift = await GiftMock.create({
            name: 'Birthday Gift',
            price: 25.00,
            website: 'http://birthdaygift.com',
            isCertificate: false,
        });

        expect(gift.name).toBe('Birthday Gift');
        expect(gift.price).toBe(25.00);
        expect(gift.website).toBe('http://birthdaygift.com');
        expect(gift.isCertificate).toBe(false);
    });

    it('allow null name and website', async () => {
        const gift = await GiftMock.create({
            price: 50.00,
            isCertificate: true,
        });

        expect(gift.name).toBe(null);
        expect(gift.website).toBe(null);
        expect(gift.price).toBe(50.00);
        expect(gift.isCertificate).toBe(true);
    });

    it('fail validation for invalid URL', async () => {
        try {
            await GiftMock.create({
                name: 'Invalid URL Gift',
                price: 30.00,
                website: 'invalid-url',
                isCertificate: true,
            });
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });

    it('non-null price and isCertificate', async () => {
        try {
            await GiftMock.create({
                name: 'Gift with no price',
                website: 'http://example.com',
            });
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });
});

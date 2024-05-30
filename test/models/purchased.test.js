const { DataTypes } = require('sequelize');
const Purchased = require('../../models/Purchased');

// Mock the Purchased model
jest.mock('../../models/Purchased', () => ({
  init: jest.fn(),
  create: jest.fn(),
}));

// Test cases
describe('Purchased Model', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls between tests
  });

  test('create a valid Purchased instance', async () => {

    Purchased.create.mockResolvedValueOnce({
      id: 1,
      date: new Date(),
      userId: 1,
      eventId: 1,
      giftIds: { giftId: 1, quantity: 2 },
    });

    const purchased = await Purchased.create({
        date: new Date(),
        userId: 1,
        eventId: 1,
        giftIds: { giftId: 1, quantity: 2 },
      });
    
      // Perform assertions on the result
      expect(purchased).toBeDefined(); 
      expect(purchased.id).toBe(1); 
      expect(purchased.date).toBeInstanceOf(Date); 
      expect(purchased.userId).toBe(1); 
      expect(purchased.eventId).toBe(1); 
      expect(purchased.giftIds).toEqual({ giftId: 1, quantity: 2 }); 

  });

  test('enforce foreign key constraints', async () => {
    // Mock the create method to throw an error when invalid foreign keys are provided
    Purchased.create.mockRejectedValue(new Error('Foreign key constraint failed'));

    // test invalid foreign keys
    // invalid userid
    await expect(
        Purchased.create({
          date: new Date(),
          userId: 2, // Invalid userId
          eventId: 1, 
          giftIds: { giftId: 1, quantity: 2 },
        })
      ).rejects.toThrow('Foreign key constraint failed');
    
      // invalid eventId
      await expect(
        Purchased.create({
          date: new Date(),
          userId: 1, 
          eventId: 2, // Invalid eventId
          giftIds: { giftId: 1, quantity: 2 },
        })
      ).rejects.toThrow('Foreign key constraint failed');      
       
  });

  test('should allow null values for giftIds', async () => {
    // Mock the create method to return a dummy instance with null giftIds
    Purchased.create.mockResolvedValueOnce({
      id: 1,
      date: new Date(),
      userId: 1,
      eventId: 1,
      giftIds: null,
    });

    // Call the method or function that creates the Purchased instance
    // and perform assertions on the result
  });
});

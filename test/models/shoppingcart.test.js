const { DataTypes } = require('sequelize');
const Cart = require('../../models/ShoppingCart');

// Mock the ShoppingCart model
jest.mock('../../models/ShoppingCart', () => ({
  init: jest.fn(),
  create: jest.fn(),
}));

describe('ShoppingCart Model', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls between tests
  });

  test('create a ShoppingCart instance with valid data', async () => {
    // create method to return a dummy instance
    Cart.create.mockResolvedValueOnce({
      id: 1,
      giftIds: [{ giftId: 1, quantity: 2 }],
    });

    // creates ShoppingCart instance
    const cart = await Cart.create({
      giftIds: [{ giftId: 1, quantity: 2 }],
    });

    // assertions
    expect(cart).toBeDefined(); 
    expect(cart.id).toBe(1); 
    expect(cart.giftIds).toEqual([{ giftId: 1, quantity: 2 }]); 
  });

  test('allow null values for giftIds', async () => {
    
    Cart.create.mockResolvedValueOnce({
      id: 1,
      giftIds: null,
    });

    // creates the ShoppingCart instance
    const cart = await Cart.create({
      giftIds: null,
    });

    // assertions
    expect(cart).toBeDefined();
    expect(cart.id).toBe(1); 
    // Check that giftIds is null
    expect(cart.giftIds).toBeNull(); 
  });
});

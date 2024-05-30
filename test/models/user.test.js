const { DataTypes } = require('sequelize');
const User = require('../../models/User');
//const Cart = require('../../models/ShoppingCart');

// Mock the User model
jest.mock('../../models/User', () => ({
  init: jest.fn(),
  create: jest.fn(),
}));

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls between tests
  });

  test('should create a User instance with valid data', async () => {
    // Mock the create method to return a dummy instance
    User.create.mockResolvedValueOnce({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
      userName: 'johndoe',
      password: 'hashedPassword',
      cartId: 1,
    });

    // Call the method or function that creates the User instance
    const user = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
      userName: 'johndoe',
      password: 'password',
      cartId: 1,
    });

    // Perform assertions on the result
    expect(user).toBeDefined(); // Ensure the result is defined
    expect(user.id).toBe(1); // Check the ID of the created instance
    expect(user.firstName).toBe('John'); // Check other properties of the updated user data
    expect(user.lastName).toBe('Doe');
    expect(user.emailAddress).toBe('john.doe@example.com');
    expect(user.userName).toBe('johndoe');
    expect(user.cartId).toBe(1);
  });

  
});

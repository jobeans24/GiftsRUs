const request = require('supertest');
const express = require('express');
const session = require('express-session');
const httpMocks = require('node-mocks-http');
const userRoutes = require('../../../controllers/api/userRoutes');  // Adjust the path as necessary

// Create an Express application for testing
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mock session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

// mocked user to user in findone method
const user = {
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    emailAddress: 'test@user.com',
    userName: 'testuser',
    password: 'hashedPassword', 
};

// Define the mock User model inside the jest.mock() call
jest.mock('../../../models/User', () => {
    const SequelizeMock = require('sequelize-mock');
    const DBConnectionMock = new SequelizeMock();
    const UserMock = DBConnectionMock.define('User', {
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        emailAddress: 'test@user.com',
        userName: 'testUser',
        password: 'password',
    });

    // Mock the User methods
    UserMock.findAll = jest.fn();
    UserMock.findByPk = jest.fn();
    UserMock.create = jest.fn();
    UserMock.update = jest.fn();
    UserMock.destroy = jest.fn();

    UserMock.findOne = jest.fn().mockResolvedValue(user);

    // Ensure the prototype exists before assigning properties
    if (!UserMock.prototype) {
        UserMock.prototype = {};
    }
    UserMock.prototype.checkPassword = jest.fn();

    return {
        User: UserMock,
    };

});

// Use the routes in the app
app.use('/users', userRoutes);

describe('User Routes', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        req.session = {}; // Mock the session

        // Clear mock calls before each test
        const { User } = require('../../../models/User');  // Get the User mock from the mocked module
        User.findAll.mockClear();
        User.findByPk.mockClear();
        User.create.mockClear();
        User.update.mockClear();
        User.destroy.mockClear();
    });

    describe('GET /users', () => {
        it('should return all users', async () => {
            const { User } = require('../../../models/User');
            const users = [
                User.build({ id: 1, userName: 'testUser1' }),
                User.build({ id: 2, userName: 'testUser2' }),
            ];
            User.findAll.mockResolvedValue(users);

            req.method = 'GET';
            req.url = '/';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(200);
        });
    });

    describe('GET /users/:id', () => {
        it('should return a single user', async () => {
            const { User } = require('../../../models/User');
            const user = User.build({ id: 1, userName: 'testUser' });
            req.params.id = 1;
            User.findByPk.mockResolvedValue(user);

            req.method = 'GET';
            req.url = '/1';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(200);
        });

        // user not found
        it('should return 404 if user not found', async () => {
            const { User } = require('../../../models/User');
            req.params.id = 999;
            User.findByPk.mockResolvedValue(null);

            req.method = 'GET';
            req.url = '/999';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'No user found with that id!' });
        });
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const { User } = require('../../../models/User');
            const user = User.build({ 
                id: 1, 
                firstName: 'Test',
                lastName: 'User',
                emailAddress: 'test@user.com',
                userName: 'testUser',
                password: 'password1',
                cartId: 1
             });

            req.body = user;
            User.create.mockResolvedValue(user);

            req.method = 'POST';
            req.url = '/';

            await userRoutes(req, res);

            expect(res.statusMessage).toEqual('OK');
        });

        it('should return 400 on creation error', async () => {
            const { User } = require('../../../models/User');
            req.body = { userName: 'testUser' };
            User.create.mockRejectedValue(new Error('Creation error'));

            req.method = 'POST';
            req.url = '/';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(400);
        });
    });

    describe('PUT /users/:id', () => {
        it('should update an existing user', async () => {
            const { User } = require('../../../models/User');
            const user = User.build({ id: 1, userName: 'testUser' });
            req.params.id = 1;
            req.body = user;
            User.update.mockResolvedValue([1]);

            req.method = 'PUT';
            req.url = '/1';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual([1]);
        });

        it('should return 404 if user not found for update', async () => {
            const { User } = require('../../../models/User');
            req.params.id = 999;
            req.body = { userName: 'testUser' };
            User.update.mockResolvedValue([0]);

            req.method = 'PUT';
            req.url = '/999';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'No user found with that id!' });
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete an existing user', async () => {
            const { User } = require('../../../models/User');
            req.params.id = 1;
            User.destroy.mockResolvedValue(1);

            req.method = 'DELETE';
            req.url = '/1';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(200);
        });

        it('should return 404 if user not found for delete', async () => {
            const { User } = require('../../../models/User');
            req.params.id = 999;
            User.destroy.mockResolvedValue(0);

            req.method = 'DELETE';
            req.url = '/999';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'No user found with that id!' });
        });
    });

    describe('POST /users/login', () => {
        it('should log in a user', async () => {
            const { User } = require('../../../models/User');
            const user = User.build({ id: 1, userName: 'testUser', password: 'password' });

            user.checkPassword = jest.fn().mockResolvedValue(true);
            req.body = { userName: 'testUser', password: 'password' };
            User.findOne.mockResolvedValue(user);

            req.method = 'POST';
            req.url = '/login';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(200);
        });

        it('should return 400 for invalid login credentials', async () => {
            const { User } = require('../../../models/User');
            req.body = { userName: 'testUser', password: 'password' };
            User.findOne.mockResolvedValue(null);

            req.method = 'POST';
            req.url = '/login';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'Incorrect user name or password - please try again!' });
        });
    });

    describe('POST /users/logout', () => {

        it('should return 404 if not logged in', async () => {
            req.session.logged_in = false;

            req.method = 'POST';
            req.url = '/logout';

            await userRoutes(req, res);

            expect(res.statusCode).toBe(404);
        });
    });
});

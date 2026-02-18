const request = require('supertest');
const express = require('express');
const dotenv = require('dotenv');
const apiRoutes = require('../routes/index');
const { errorHandler } = require('../middlewares/error.middleware');

// Load env vars for test
dotenv.config();

// Mock the database connection
jest.mock('../config/db', () => jest.fn());

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);
app.use(errorHandler);

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    // Mock the User.findOne and User.create methods for this test
    const User = require('../models/user.model');
    User.findOne = jest.fn().mockResolvedValue(null);
    User.create = jest.fn().mockResolvedValue({
      _id: 'some_id',
      name: 'Test User',
      email: 'test@example.com',
      role: 'farmer',
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register a user if email already exists', async () => {
    const User = require('../models/user.model');
    User.findOne = jest.fn().mockResolvedValue({ email: 'exists@example.com' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Another User',
        email: 'exists@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('User already exists');
  });
});
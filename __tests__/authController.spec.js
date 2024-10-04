import { register, login } from '../src/controllers/authController';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { createUser, findUserByEmail } from '../src/models/User';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('express-validator');
jest.mock('../src/models/User');

describe('AuthController', () => {

  let req;
  let res;
  let mockUser;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };

    mockUser = {
      user_id: '12345',
      email: 'test@example.com',
      password: 'hashedpassword'
    };

    validationResult.mockReturnValue({
      isEmpty: () => true,
      array: () => []
    });
  });

  describe('register', () => {
    it('should return 400 if user already exists', async () => {
      findUserByEmail.mockResolvedValue(mockUser);

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'User already exists!' });
    });

    it('should create a new user and return a token', async () => {
      findUserByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedpassword');
      createUser.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('token123');

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
      expect(createUser).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword'
      });
      expect(jwt.sign).toHaveBeenCalledWith(
        { user_id: mockUser.user_id },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ token: 'token123' });
    });

  });

  describe('login', () => {

    it('should return 400 if user does not exist', async () => {
      findUserByEmail.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials email or password!' });
    });

    it('should return 400 if password does not match', async () => {
      findUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials email or password!' });
    });

    it('should return a token if login is successful', async () => {
      findUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token123');

      await login(req, res);

      expect(jwt.sign).toHaveBeenCalledWith(
        { user_id: mockUser.user_id },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
      );
      expect(res.json).toHaveBeenCalledWith({ token: 'token123' });
    });
  });
});

// src/app.js

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/index.js';
import authMiddleware from './middlewares/auth.js';

const app = express();

// Middlewares globais
app.use(express.json());
app.use(authMiddleware);

// Rotas
app.use('/', routes);

export default app;

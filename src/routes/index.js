// src/routes/index.js

import express from 'express';
const router = express.Router();

import authRoutes from './auth.js';
import urlRoutes from './url.js';

// Configurar as rotas
router.use('/auth', authRoutes);
router.use('/urls', urlRoutes);

// Rota raiz para verificar se a API está funcionando
router.get('/', (req, res) => {
  res.send('API do Encurtador de URLs');
});

export default router;

// src/routes/auth.js

import express from 'express';
const router = express.Router();

import { register, login } from '../controllers/authController.js';
import { check } from 'express-validator';

router.post(
  '/register',
  [
    check('email', 'E-mail inválido').isEmail(),
    check('password', 'A senha deve ter no mínimo 6 caracteres').isLength({ min: 6 }),
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'E-mail inválido').isEmail(),
    check('password', 'Senha é obrigatória').exists(),
  ],
  login
);

export default router;

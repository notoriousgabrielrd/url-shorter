// src/routes/url.js

import express from 'express';
const router = express.Router();

import { shortenUrl, redirectUrl } from '../controllers/urlController.js';
import { check } from 'express-validator';

// Rota para encurtar URL (pública ou autenticada)
router.post(
  '/shorten',
  [check('originalUrl', 'URL inválida').isURL()],
  shortenUrl
);

// Rota para redirecionar a URL encurtada
router.get('/:shortUrl', redirectUrl);

export default router;

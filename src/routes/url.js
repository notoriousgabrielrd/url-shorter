import express from 'express';
const router = express.Router();

import { shortenUrl, redirectUrl, updateUrlDestination, listUserUrls, deleteUrl } from '../controllers/urlController.js';
import { check } from 'express-validator';
import authMiddleware from '../middlewares/auth.js';

router.post(
  '/shorten',
  [check('originalUrl', 'URL inválida').isURL()],
  shortenUrl
);

router.get(
  '/',
  authMiddleware, listUserUrls
)

router.get('/:shortUrl', redirectUrl);

router.put('/:id',
  authMiddleware,
  [
    check('originalUrl', 'URL inválida').isURL()
  ],
  updateUrlDestination
)

router.delete('/:id', authMiddleware, deleteUrl);

export default router;

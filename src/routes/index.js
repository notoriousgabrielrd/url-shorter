
import express from 'express';
const router = express.Router();

import authRoutes from './auth.js';
import urlRoutes from './url.js';

router.use('/auth', authRoutes);
router.use('/urls', urlRoutes);

router.get('/', (req, res) => {
  res.send('API to short URLs');
});

export default router;

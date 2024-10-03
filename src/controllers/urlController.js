// src/controllers/urlController.js

import { nanoid } from 'nanoid';
import { validationResult } from 'express-validator';
import { AppDataSource } from '../data-source.js';
import { Url } from '../entities/Url.js';
import { User } from '../entities/User.js';

export const shortenUrl = async (req, res) => {
  // Validação dos dados
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { originalUrl } = req.body;
  const shortUrl = nanoid(6);

  try {
    const urlRepository = AppDataSource.getRepository(Url);

    const url = new Url();
    url.originalUrl = originalUrl;
    url.shortUrl = shortUrl;

    if (req.user) {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: req.user.userId });
      url.user = user;
    }

    await urlRepository.save(url);

    res.json({
      shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlRepository = AppDataSource.getRepository(Url);
    const url = await urlRepository.findOneBy({ shortUrl });

    if (url && !url.deletedAt) {
      url.clicks++;
      await urlRepository.save(url);

      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ msg: 'URL não encontrada' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

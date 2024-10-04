
import { nanoid } from 'nanoid';
import { validationResult } from 'express-validator';
import { createUrl, findUrlById, findUrlByShortUrl, findUrlsAndClickSumByUserId, incrementClick, updateUrlById } from '../models/Url.js';
import { findUserById, findUrlsByUserId, deleteUrlById } from '../models/User.js';

export const shortenUrl = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // TODO componentizar isso <<<
  }

  const { originalUrl } = req.body;
  const shortUrl = nanoid(6);

  try {
    const urlData = {
      original_url: originalUrl,
      shorter_url: shortUrl,
    };

    if (req.user) {
      const user = await findUserById(req.user.user_id);
      if (user) {
        urlData.user_id = user.user_id;
      }
    }

    const url = await createUrl(urlData);

    res.json({
      shorter_url: `${req.protocol}://${req.get('host')}/urls/${url.shorter_url}`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await findUrlByShortUrl(shortUrl);

    if (url && !url.deleted_at) {
      await incrementClick(url.url_id);
      return res.redirect(url.original_url);
    } else {
      return res.status(404).json({ msg: 'URL não encontrada' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const listUserUrls = async (req, res) => {
  try{
      const user_id = req.user.user_id

      const { urls, totalClicks } = await findUrlsAndClickSumByUserId(user_id);

      if(urls.length === 0) {
        return res.status(404).json({
          msg: "There ir no url associated with this user"
        })
      }

      res.json({
        urls,
        totalClicks
      });

  } catch (err) { 
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export const updateUrlDestination = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // TODO componentizar isso <<<
  }

  const { id } = req.params;
  const { originalUrl } = req.body; 
  const user_id = req.user.user_id; 
  try {
    const url = await findUrlsByUserId(user_id);

    if (!url || url[0].user_id !== user_id) {
      return res.status(404).json({ msg: 'URL not found or you can not edit it' });
    }

    const updatedUrl = await updateUrlById(id, {
      original_url: originalUrl
    })

    return res.json({
      msg: 'Updated url',
      url: updatedUrl
    })
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export const deleteUrl = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id; 
  console.log("user_id", user_id)
  try {
    const url = await findUrlById(id)
    console.log("url", url)
    if (!url || url.user_id !== user_id) {
      return res.status(404).json({ msg: 'URL not found or you can not edit it' });
    }

    await deleteUrlById(id);

    return res.json({
      msg: "The URL has been deleted"
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
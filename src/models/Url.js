// src/models/Url.js

import knex from '../db/knex.js';

export const createUrl = async (urlData) => {
  const [url] = await knex('Urls').insert(urlData).returning('*');
  return url;
};

export const findUrlByShortUrl = async (shortUrl) => {
  return knex('Urls').where({ shorter_url: shortUrl }).first();
};

export const incrementClick = async (id) => {
  return knex('Urls').where({ url_id:id }).increment('clicks', 1);
};

export const findUrlsAndClickSumByUserId = async (userId) => {
  const urls = await knex('Urls')
    .where({ user_id: userId })
    .andWhere('deleted_at', null)
    .select('*');

  const clickSum = await knex('Urls')
    .where({ user_id: userId })
    .andWhere('deleted_at', null)
    .sum('clicks as totalClicks')
    .first();

  return {
    urls,
    totalClicks: clickSum.totalClicks || 0 
  };
};

export const findUrlById = async (id) => {
  return knex('Urls').where({ url_id: id }).first(); 
};

export const updateUrlById = async (id, updateData) => {
  return knex('Urls')
  .where({ url_id: id })
  .update(updateData)
  .returning('*');
}
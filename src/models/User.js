// src/models/User.js

import knex from '../db/knex.js';

export const createUser = async (userData) => {
  const [user] = await knex('Users').insert(userData).returning(['user_id', 'email']);
  return user;
};

export const findUserByEmail = async (email) => {
  return knex('Users').where({ email }).first();
};

export const findUserById = async (id) => {
  return knex('Users').where({ user_id:id }).andWhere('deleted_at', null).first();
};

export const findUrlsByUserId = async (userId) => {
  return knex('Urls').where({ user_id: userId }).andWhere('deleted_at', null).select('*');
};

export const deleteUrlById = async (id) => {
  return knex('Urls')
    .where({ url_id: id })
    .update({ deleted_at: new Date() });
};

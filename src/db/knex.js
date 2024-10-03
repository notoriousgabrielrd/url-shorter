// src/db/knex.js

import knex from 'knex';
import knexConfig from '../../knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const configOptions = knexConfig[environment];

export default knex(configOptions);

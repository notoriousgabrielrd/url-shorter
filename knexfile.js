import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

export default {
  development: {
    client: 'pg', // Use 'pg' para PostgreSQL
    connection: process.env.DATABASE_URL, // Use a variável de ambiente DATABASE_URL
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },
  production: {
    client: 'pg', // Use 'pg' para PostgreSQL no ambiente de produção também
    connection: process.env.DATABASE_URL, // Use a variável de ambiente DATABASE_URL
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },
};

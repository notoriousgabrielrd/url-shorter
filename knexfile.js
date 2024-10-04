import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

export default {
  development: {
    client: 'pg', // Use 'pg' para PostgreSQL
    connection: process.env.DATABASE_URL, // Use a variável de ambiente DATABASE_URL para desenvolvimento
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },
  production: {
    client: 'pg', // Use 'pg' para PostgreSQL no ambiente de produção
    connection: process.env.DATABASE_URL, // Use a variável de ambiente DATABASE_URL para produção
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },
  test: {
    client: 'pg', // PostgreSQL para o ambiente de teste
    connection: {
      host: process.env.TEST_DB_HOST || '127.0.0.1',
      user: process.env.TEST_DB_USER || 'your_test_user',
      password: process.env.TEST_DB_PASSWORD || 'your_test_password',
      database: process.env.TEST_DB_NAME || 'your_test_database', // Nome do banco de dados de teste
    },
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },
};



import 'reflect-metadata';
import app from './src/app.js';
import { AppDataSource } from './src/data-source.js';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT} ✨`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados', error);
  });

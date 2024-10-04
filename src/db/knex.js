import knex from 'knex';
import knexConfig from '../../knexfile.js'; // Certifique-se de que o caminho está correto

const environment = process.env.NODE_ENV || 'development'; // Usa 'development' se NODE_ENV não estiver definido
const configOptions = knexConfig[environment]; // Carrega a configuração do ambiente correto

if (!configOptions) {
  throw new Error(`Nenhuma configuração encontrada para o ambiente: ${environment}`);
}

export default knex(configOptions);

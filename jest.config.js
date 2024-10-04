export default {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'node',
    transformIgnorePatterns: [
      '/node_modules/(?!nanoid)/', // Exclui 'nanoid' da regra que ignora transformações em node_modules
    ],
    moduleFileExtensions: ['js', 'json'], // Garante que extensões JS e JSON sejam suportadas
  };
  
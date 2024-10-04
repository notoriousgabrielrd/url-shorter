# Use a imagem oficial do Node.js como base
FROM node:20

# Cria um diretório de trabalho no container
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json para o diretório de trabalho
# O caminho '../' se refere à raiz do projeto, onde o código e o package.json estão
COPY ../package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto para o diretório de trabalho
COPY ../ ./

# Expõe a porta 3000
EXPOSE 3000

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Executa o comando para iniciar o servidor
CMD ["sh", "-c", "npm run knex migrate:latest && npm run start"]
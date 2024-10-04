# url-shorter (encurtador de url)

Olá avaliador. Tudo bem? Espero que sim!
Este é o meu teste técnico. Tentei abordar todas as demandas citadas no documento
e estabeleci o seguinte MVP:

[x] - criacao de usuario
[x] - login de usuario
[x] - geracao de jwt
[x] - autenticacao com middleware
[x] - rota para encurtar a URL
[x] - contador de cliques na rota encurtada
[x] - CRUD para alterar a url encurtada (para usuarios autenticados)
[x] - dockerizacao do projeto
[x] - cobertura de testes 

### Como rodar o projeto?
#### Com docker
1. npm install
2. docker-compose up --build
3. npm run migrate

#### Sem docker
1. npm install
2. npm run dev
3. npm run migrate

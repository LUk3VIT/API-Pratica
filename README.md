# API-Pratica

E-commerce simples (API REST) em TypeScript + Express com autenticação JWT e CRUD de produtos. Persistência via SQLite (Sequelize) e documentação via Swagger.

Status
- Protótipo / educacional — pronto para testes locais.

Badges
- (adicione CI / coverage / license conforme disponível)

Tecnologias
- Node.js, TypeScript, Express
- Sequelize + SQLite
- JWT (jsonwebtoken) + bcryptjs
- Swagger (swagger-jsdoc + swagger-ui-express)

Pré-requisitos
- Node.js >= 16
- npm

Instalação e execução
1. Instale dependências:
```sh
npm install
```
2. Crie arquivo de ambiente `.env.local` (exemplo):
```env
# JWT secret para gerar/verificar tokens
JWT_SECRET=uma_chave_secreta
# Opcional: porta e caminho do DB
PORT=3000
DB_STORAGE=./database.sqlite
```
3. Rodar em desenvolvimento:
```sh
npm run dev
```
Acesse: http://localhost:3000  
Swagger: http://localhost:3000/api-docs

Scripts úteis
- npm run dev — desenvolvimento (ts-node-dev)  
- npm run build — compilar TS → dist  
- npm start — rodar compilado  
- npm test — rodar testes (se existirem)

Estrutura do projeto
- src/
  - config/        — database, swagger
  - controllers/   — handlers HTTP
  - middlewares/   — auth, validações
  - models/        — Sequelize models
  - repositories/  — acesso ao DB
  - routes/        — rotas da API
  - services/      — lógica de negócio
  - server.ts      — ponto de entrada

Endpoints principais
- Autenticação
  - POST /api/auth/register — criar usuário  
    Exemplo body: { "name":"User", "email":"u@e.com", "password":"senha" }
  - POST /api/auth/login — obter token  
    Exemplo body: { "email":"u@e.com", "password":"senha" }  
    Resposta: { "token": "ey..." }

- Produtos (protegido com Bearer token)
  - GET /api/produto — listar produtos
  - GET /api/produto/:id — obter produto
  - POST /api/produto — criar produto  
    Exemplo header: Authorization: Bearer <TOKEN>  
    Exemplo body: { "name":"Produto A", "tipo":"eletrônico" }
  - PUT /api/produto/:id — atualizar
  - DELETE /api/produto/:id — remover

Exemplos rápidos (curl)
- Login:
```sh
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"u@e.com","password":"senha"}'
```
- Criar produto (substituir <TOKEN>):
```sh
curl -X POST http://localhost:3000/api/produto \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Produto A","tipo":"categoria"}'
```

Banco de dados
- Arquivo SQLite configurado em src/config (DB_STORAGE). Para reset, remova o arquivo .sqlite e reinicie a aplicação.
- Recomenda-se adicionar migrations/seeders com Sequelize CLI para produção.

Boas práticas / próximos passos
- Validar entrada (Joi / Zod)
- Centralizar tratamento de erros
- Adicionar testes automatizados (Jest + supertest)
- CI/CD e Dockerização
- Adicionar LICENSE e contributing.md

Contribuição
- Fork → branch feature → PR com descrição e testes (quando possível)

Licença
- Adicionar um arquivo LICENSE no repositório se for público.

oi

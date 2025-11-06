# API-Prática

Uma API REST completa desenvolvida com Node.js, TypeScript e Express para gerenciamento de produtos com sistema de autenticação.

## 📋 Sobre o Projeto

Este projeto é uma API REST que implementa operações CRUD para produtos com sistema de autenticação JWT. Inclui uma interface web para interação com os endpoints e documentação Swagger.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Express.js** - Framework web para Node.js
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados relacional leve
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas
- **dotenv** - Gerenciamento de variáveis de ambiente

### Documentação
- **Swagger UI Express** - Interface para documentação da API
- **swagger-jsdoc** - Geração de documentação Swagger

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização
- **JavaScript** - Interatividade no frontend

### Ferramentas de Desenvolvimento
- **ts-node-dev** - Desenvolvimento com hot reload
- **TypeScript Compiler** - Compilação para JavaScript

## 📁 Estrutura do Projeto

```
src/
├── config/          # Configurações (database, swagger)
├── controllers/     # Controladores da aplicação
├── middlewares/     # Middlewares (autenticação)
├── models/          # Modelos do banco de dados
├── repositories/    # Camada de acesso aos dados
├── routes/          # Definição das rotas
├── services/        # Lógica de negócio
├── public/          # Arquivos estáticos (HTML, CSS, JS)
└── server.ts        # Arquivo principal do servidor
```

## 🔧 Instalação e Configuração

1. **Clone o repositório:**
```bash
git clone https://github.com/LUk3VIT/API-Pratica.git
cd API-Pratica
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute em modo de desenvolvimento:**
```bash
npm run dev
```

4. **Ou compile e execute em produção:**
```bash
npm run build
npm start
```

## 📚 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login de usuário

### Produtos
- `GET /api/produto` - Listar produtos
- `POST /api/produto` - Criar produto (requer autenticação)
- `PUT /api/produto/:id` - Atualizar produto (requer autenticação)
- `DELETE /api/produto/:id` - Deletar produto (requer autenticação)

## 📖 Documentação

A documentação da API está disponível via Swagger UI em:
```
http://localhost:3000/api-docs
```

## 🌐 Interface Web

Acesse a interface web em:
```
http://localhost:3000
```

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

- **Controllers**: Gerenciam as requisições HTTP
- **Services**: Contêm a lógica de negócio
- **Repositories**: Abstraem o acesso aos dados
- **Models**: Definem a estrutura dos dados
- **Middlewares**: Processam requisições (autenticação, validação)

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. As senhas são criptografadas usando bcrypt antes de serem armazenadas no banco de dados.

## 💾 Banco de Dados

Utiliza SQLite como banco de dados, com Sequelize como ORM para:
- Mapeamento objeto-relacional
- Migrações automáticas
- Validações de dados

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

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

# API-Pratica

Nesse projeto colocarei em pratica, o conhecimento de montar um API REST simples, 
para isso vamos usar Express, Swagger, JWT e TypeScript

# Exprexx

Ele é a parte principal da API ele que vai fazer a parte estrutural

## 1️⃣ iniciar o projeto
    
```
npm init -y
```    
    
## 2️⃣ baixar as dependencias

Dependência Principal:

```
npm install express
```
   
## 3️⃣ Dependência de desenvolvimento

```
npm install -D typescript ts-node-dev @types/node @types/express
```

## 4️⃣ Criar o arquivo de configuração do typeScript

```
npx tsc --init
```

Edite o arquivo tsconfig.json para ter as opções abaixo:

   ```typescript
   {
   "compilerOptions": {
      "target": "ES2020",
      "module": "commonjs",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true
    }
   }
   ```

## 5️⃣ Estruturar o projeto

Crie as pastas principais:

```
mkdir src src/routes src/controllers
```

A estrutura ficará assim:

```
   src/
   ├── controllers/
   │    └── UserController.ts
   ├── routes/
   │    └── userRoutes.ts
   └── server.ts
```

## 6️⃣ Configurar scripts no package.json

Abra o arquivo package.json e adicione os scripts:

```typescript
   "scripts": {
   "dev": "ts-node-dev --respawn src/server.ts",
   "build": "tsc",
   "start": "node dist/server.js"
   }
```

- **`dev`:** roda a API em modo desenvolvimento
- **`build`:** compila os arquivos TS para JS
- **`start`:** roda o projeto já compilado

## 7️⃣ Criar o servidor (server.ts)

Crie o arquivo `src/server.ts` com o seguinte código:

```typescript
   import express from "express";
   import userRoutes from "./routes/userRoutes";

   const app = express();
   app.use(express.json());

   // Rotas
   app.use("/users", userRoutes);

   const PORT = 3000;
   app.listen(PORT, () => {
   console.log(`🚀 Server running at http://localhost:${PORT}`);
   });
```

## 8️⃣ Criar as rotas (userRoutes.ts)

Crie o arquivo src/routes/userRoutes.ts:

```typescript
   import { Router } from "express";
   import { UserController } from "../controllers/UserController";

   const router = Router();
   const userController = new UserController();

   router.get("/", (req, res) => userController.getAll(req, res));
   router.get("/:id", (req, res) => userController.getById(req, res));
   router.post("/", (req, res) => userController.create(req, res));
   router.put("/:id", (req, res) => userController.update(req, res));
   router.delete("/:id", (req, res) => userController.delete(req, res));

   export default router;
```

## 9️⃣ Criar o controller (UserController.ts)

Crie o arquivo src/controllers/UserController.ts:

```typescript
   import { Request, Response } from "express";

   interface User {
   id: number;
   name: string;
   email: string;
   }

   export class UserController {
   private users: User[] = [];
   private idCounter = 1;

   getAll(req: Request, res: Response): Response {
      return res.json(this.users);
   }

   getById(req: Request, res: Response): Response {
      const id = Number(req.params.id);
      const user = this.users.find(u => u.id === id);
      return user ? res.json(user) : res.status(404).json({ message: "User not found" });
   }

   create(req: Request, res: Response): Response {
      const { name, email } = req.body;
      const newUser: User = { id: this.idCounter++, name, email };
      this.users.push(newUser);
      return res.status(201).json(newUser);
   }

   update(req: Request, res: Response): Response {
      const id = Number(req.params.id);
      const { name, email } = req.body;
      const user = this.users.find(u => u.id === id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.name = name ?? user.name;
      user.email = email ?? user.email;
      return res.json(user);
   }

   delete(req: Request, res: Response): Response {
      const id = Number(req.params.id);
      this.users = this.users.filter(u => u.id !== id);
      return res.status(204).send();
   }
   }
```

## 🔟 Rodar a API

Execute o comando:

```
npm run dev
```

Se tudo deu certo, você verá no terminal:

`🚀 Server running at http://localhost:3000`

Para testar a API usar Postman ou Insomnia 

# Swagger

para esse passo a passo terenis agora documentação automática e testes das rotas
da API com Swagger

## 1️⃣ Instalar dependências do Swagger

```
npm install swagger-ui-express swagger-jsdoc
npm install -D @types/swagger-ui-express @types/swagger-jsdoc
```

## 2️⃣ Criar pasta config

```
mkdir src/config
```

## 3️⃣ Criar configuração do Swagger

Crie o arquivo src/config/swagger.ts:

```typescript
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'API REST para gerenciamento de usuários',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
```

## 4️⃣ Atualizar o servidor

Modifique `src/server.ts:`

```typescript
import express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
```

## 5️⃣ Documentar as rotas

Atualize `src/routes/userRoutes.ts`:

```typescript
import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", (req, res) => userController.getAll(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", (req, res) => userController.getById(req, res));

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/", (req, res) => userController.create(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", (req, res) => userController.update(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Usuário removido
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", (req, res) => userController.delete(req, res));

export default router;
```

## 6️⃣ Testar a documentação

Execute a API:

```
npm run dev
```

Acesse: `http://localhost:3000/api-docs`


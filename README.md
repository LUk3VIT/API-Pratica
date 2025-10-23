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

Com esse passo a passo, teremos agora documentação automática e testes das rotas
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

# JWT

Com esse passo a passo, teremos segurança para as senhas que terão criptografias com bcrypt, 
Middleware valida todos os tokens e tokens que expiram em 24h.

## 1️⃣ Instalar dependências JWT

```
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken @types/bcryptjs
```

## 2️⃣ Criar pasta middlewares

```
mkdir src/middlewares
```

## 3️⃣ Crie o middlewares

Crie ```src/middlewares/auth.ts```:

```typescript
import { Request, Response, NextFunction } from "express";  
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta';

export interface AuthRequest extends Request {
    userId?: number;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    
    if(!token){
        return res.status(401).json({message: 'Token não Fornecido'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
        req.userId = decoded.userId;
        next();
    }catch (error){
        return res.status(401).json({message: 'Token inválido'});
    }
}
```

## 4️⃣ Criar rotas de autenticação

Crie ```src/routes/authRoutes.ts```:

```typescript
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@teste.com
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", (req, res) => authController.login(req, res));

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/register", (req, res) => authController.register(req, res));

export default router;
```

## 5️⃣ Proteger rotas de usuários:

```typescript
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const userController = new UserController();

router.use(authMiddleware);

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *          properties:
 *              id:
 *                  type: integer
 *                  description: ID único do usuário
 *              name: 
 *                  type: string
 *                  description: Nome do usuário
 *              email:
 *                  type: string
 *                  description: Email do usuário
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Nenhum usuário encontrado
 */

router.get("/", (req, res) => userController.getAll(req, res));

// segue o exemplo para as outras rotas Com
//
//    security: 
//       - bearerAuth: []
//
```

## 6️⃣ Atualizar servidor:

Modifique ```src/server.ts```:

```typescript
import express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./config/swagger";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";        


const app = express();
app.use(express.json());

//Swagger
//Rotas

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('📚 Swagger docs at http://localhost:3000/api-docs');
})
```

## 7️⃣ Testar a documentação

Execute a API:

```
npm run dev
```

Acesse: `http://localhost:3000/api-docs`

# Databese/SQLite

Agora vamos usar um banco de dados para persistência de dados 
e implementar padrão Repository e Service


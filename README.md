# API-Pratica
 
Nesse projeto colocarei em pratica, o conhecimento de montar um API REST simples, para isso vamos usar Express e TypeScript

1️⃣ iniciar o projeto

    ```npm init -y```

2️⃣ baixar as dependencias

Dependência Principal:

   ```npm install express```

Dependência de desenvolvimento:

   ```npm install -D typescript ts-node-dev @types/node @types/express```

3. Criar o arquivo de configuração do typeScript

npx tsc --init

   ```{
   "compilerOptions": {
      "target": "ES2020",
      "module": "commonjs",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true
    }
   }```

4. Estruturar o projeto

Crie as pastas principais:

    mkdir src src/routes src/controllers

A estrutura ficará assim:

   src/
   ├── controllers/
   │    └── UserController.ts
   ├── routes/
   │    └── userRoutes.ts
   └── server.ts

5. Configurar scripts no package.json

Abra o arquivo package.json e adicione os scripts:

   "scripts": {
   "dev": "ts-node-dev --respawn src/server.ts",
   "build": "tsc",
   "start": "node dist/server.js"
   }

   dev: roda a API em modo desenvolvimento
   build: compila os arquivos TS para JS
   start: roda o projeto já compilado

6. Criar o servidor (server.ts)

Crie o arquivo src/server.ts com o seguinte código:

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

7. Criar as rotas (userRoutes.ts)

Crie o arquivo src/routes/userRoutes.ts:

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

9. Criar o controller (UserController.ts)

Crie o arquivo src/controllers/UserController.ts:

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

9. Rodar a API
Execute o comando:

   npm run dev

Se tudo deu certo, você verá no terminal:

   🚀 Server running at http://localhost:3000


Swagger

para esse passo a passo faremos documentação e testes das rotas de api, 


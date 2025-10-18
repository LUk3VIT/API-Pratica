import express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./config/swagger";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Rotas
// Monta as rotas de usuários sob o prefixo /api/users para combinar com os paths do Swagger
app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('📚 Swagger docs at http://localhost:3000/api-docs');
})
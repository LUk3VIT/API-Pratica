import express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./config/swagger";
import produtoRoutes from "./routes/produtoRoutes";
import authRoutes from "./routes/authRoutes";        


const app = express();
app.use(express.json());

//Swagger
//Rotas

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/produto", produtoRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('📚 Swagger docs at http://localhost:3000/api-docs');
})
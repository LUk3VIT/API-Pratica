import express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./config/swagger";
import { connectDatabase } from "./config/database";
import produtoRoutes from "./routes/produtoRoutes";
import authRoutes from "./routes/authRoutes"; 
import cors from "cors";


const app = express();
app.use(cors())
app.use(express.json());

//Swagger
//Rotas

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/produto", produtoRoutes);
app.use("/api/auth", authRoutes);

const port = 8080;

const startServer = async () =>{
    await connectDatabase();
    app.listen(port, () => {
        console.log("Servidor de API rodando na porta", port)
    });
};

startServer();

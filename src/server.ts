import express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./config/swagger";
import { connectDatabase } from "./config/database";
import produtoRoutes from "./routes/produtoRoutes";
import authRoutes from "./routes/authRoutes"; 
import userRoutes from "./routes/UserRoutes";
      


const app = express();
app.use(express.json());

//Swagger
//Rotas

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/produto", produtoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const port = 3000;

const startServer = async () =>{
    await connectDatabase();
    app.listen(port, () => {
        console.log("Servidor de API rodando na porta", port)
    });
};

startServer();

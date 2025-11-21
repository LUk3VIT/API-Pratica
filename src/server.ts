import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { connectDatabase } from "./config/database";
import produtoRoutes from "./routes/produtoRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/produto", produtoRoutes);

const port = 3000;

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log("Servidor de API rodando na porta", port);
    console.log(`Acesso em: http://localhost:${port}`);
  });
};

startServer();
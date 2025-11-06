import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { connectDatabase } from "./config/database";
import produtoRoutes from "./routes/produtoRoutes";
import authRoutes from "./routes/authRoutes";
import path from "path";

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/produto", produtoRoutes);

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

const port = 3000;

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log("Servidor de API rodando na porta", port);
    console.log(`Acesso em: http://localhost:${port}/index.html`);
  });
};

startServer();
import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

//Rotas
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`);
})
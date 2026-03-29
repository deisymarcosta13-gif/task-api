import express from "express";
import { env } from "./config/env";
import { db } from "./persistence/mysql.connection";
import routes from "./api/routes";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({
      message: "API funcionando ",
      db: "Conectada "
    });
  } catch (error: any) {
    console.error(" ERROR DB:", error.message);

    res.status(500).json({
      message: "Error conectando a DB ",
      error: error.message
    });
  }
});

app.listen(env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
});

app.use("/api", routes);
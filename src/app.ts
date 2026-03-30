import express from "express";
import { env } from "./config/env";
import { db } from "./persistence/mysql.connection";
import routes from "./api/routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log("Documentación disponible en /api-docs");

// Ruta de prueba
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({
      message: "API funcionando",
      db: "Conectada"
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error conectando a DB",
      error: error.message
    });
  }
});

app.use("/api", routes);

app.listen(env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
});
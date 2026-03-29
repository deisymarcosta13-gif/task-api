import dotenv from "dotenv";
import path from "path";

// FORZAMOS lectura del .env correctamente
dotenv.config({
  path: path.resolve(process.cwd(), ".env")
});

class EnvConfig {
  public readonly PORT: number;
  public readonly DB_HOST: string;
  public readonly DB_PORT: number;
  public readonly DB_USER: string;
  public readonly DB_PASSWORD: string;
  public readonly DB_NAME: string;
  public readonly JWT_SECRET: string;

  private static instance: EnvConfig;

  private constructor() {
    console.log("🔍 Variables cargadas:");
    console.log("PORT:", process.env.PORT);
    console.log("DB_USER:", process.env.DB_USER);

    this.PORT = Number(process.env.PORT) || 5000;
    this.DB_HOST = process.env.DB_HOST || "localhost";
    this.DB_PORT = Number(process.env.DB_PORT) || 3306;
    this.DB_USER = process.env.DB_USER || "";
    this.DB_PASSWORD = process.env.DB_PASSWORD || "";
    this.DB_NAME = process.env.DB_NAME || "";
    this.JWT_SECRET = process.env.JWT_SECRET || "";
  }

  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }
    return EnvConfig.instance;
  }
}

export const env = EnvConfig.getInstance();
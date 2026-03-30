import swaggerJsDoc from "swagger-jsdoc";

export const swaggerOptions = {
  definition: {
    components: {
        securitySchemes: {
            bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            },
        },
    },
    info: {
      title: "API Sistema de Gestión de Tareas",
      version: "1.0.0",
      description: "Documentación de la API para la prueba técnica Backend"
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/api/routes/*.ts", "./src/controllers/*.ts"], // aquí se leen los comentarios JSDoc
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);
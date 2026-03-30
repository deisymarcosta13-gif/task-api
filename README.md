# Sistema de Gestión de Tareas API

## Descripción del Proyecto

Este proyecto consiste en el desarrollo de una API RESTful que permite a los usuarios registrarse, autenticarse y gestionar sus tareas personales.

La API implementa autenticación mediante JSON Web Tokens (JWT) y garantiza que cada usuario solo pueda acceder a sus propias tareas.

Fue desarrollada utilizando Node.js, Express y TypeScript, aplicando buenas prácticas como separación por capas, uso de variables de entorno y manejo de errores.

---

## Arquitectura del Proyecto

El proyecto está organizado en capas para separar responsabilidades:

### Capas del sistema

- **api**: rutas y middlewares  
- **controllers**: manejo de peticiones HTTP  
- **services**: lógica de negocio  
- **persistence**: acceso a base de datos  
- **config**: configuración general  
- **utils**: funciones auxiliares  
- **errors**: manejo de errores personalizados  

---

##  Instalación del Proyecto

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd task-manager-api
2. Instalar dependencias
npm install
Configuración del archivo .env

Crear un archivo .env en la raíz del proyecto basado en .env.example.

3.1 Ejemplo de configuración
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=taskbd

JWT_SECRET=secret_key
Base de Datos

4. Configuración actual

El proyecto fue desarrollado utilizando MySQL debido a limitaciones técnicas en el entorno local.

Migración a PostgreSQL
5. Migración
Aunque se utilizó MySQL, el proyecto puede adaptarse fácilmente a PostgreSQL realizando los siguientes cambios:

5.1 Cambios necesarios
-Cambiar la conexión a base de datos
-Utilizar la librería pg
-Ajustar las consultas SQL

5.2 Diferencias en consultas
-MySQL usa: ?
-PostgreSQL usa: $1, $2, $3

Ejecución del Proyecto
6. Ejecutar el servidor
npm run dev

7. URL del servidor
http://localhost:5000

Autenticación
8. Uso de JWT
Las rutas protegidas requieren un token JWT.

8.1 Enviar token en headers
Authorization: Bearer <token>
Endpoints

9. Autenticación

-POST /api/auth/register
-POST /api/auth/login

10. Tareas
-POST /api/tasks
-GET /api/tasks
-GET /api/tasks/:id
-PUT /api/tasks/:id
-DELETE /api/tasks/:id

Documentación
11. Swagger
http://localhost:5000/api-docs

Buenas Prácticas Implementadas
12. Prácticas aplicadas
-Arquitectura por capas
-Uso de TypeScript
-Manejo de errores
-Uso de variables de entorno
-Autenticación con JWT
-Documentación con Swagger
-Conventional Commits

13. Consideraciones

Se priorizó:
-La correcta estructura del proyecto
-El funcionamiento completo del CRUD
-La seguridad mediante autenticación
-La claridad del código

---

Autora
Deisy Mariana Acosta Correa



# Pruebas de la API — POSTMAN_TESTS.md

## Descripción

En esta sección se documentan las pruebas realizadas a la API utilizando Postman, verificando el correcto funcionamiento de todos los endpoints.

Antes de iniciar las pruebas, se eliminaron los datos existentes en la base de datos para trabajar con un entorno limpio y controlado.

---

## 1. Registro de Usuario

### Endpoint
POST http://localhost:5000/api/auth/register

### Body enviado

```json
{
  "name": "Mariana Acosta",
  "email": "mariana@test.com",
  "password": "123456"
}
Resultado

Usuario creado exitosamente con código 201.

Evidencia

2. Login de Usuario
Endpoint

POST http://localhost:5000/api/auth/login

Body enviado
{
  "email": "mariana@test.com",
  "password": "123456"
}
Resultado

Login exitoso. Se obtiene token JWT.

Evidencia

3. Crear Tarea
Endpoint

POST http://localhost:5000/api/tasks

Headers

Authorization: Bearer <token>

Body enviado
{
  "title": "Mi primera tarea",
  "description": "Aprender backend",
  "due_date": "2026-12-31"
}
Resultado

Tarea creada correctamente.

Evidencia

4. Obtener Tareas
Endpoint

GET http://localhost:5000/api/tasks

Headers

Authorization: Bearer <token>

Resultado

Lista de tareas del usuario autenticado.

Evidencia

5. Obtener Tarea por ID
Endpoint

GET http://localhost:5000/api/tasks/1

Headers

Authorization: Bearer <token>

Resultado

Se obtiene la tarea específica.

Evidencia

6. Actualizar Tarea
Endpoint

PUT http://localhost:5000/api/tasks/1

Headers

Authorization: Bearer <token>

Body enviado
{
  "title": "Tarea actualizada",
  "description": "Backend completo",
  "due_date": "2026-12-31",
  "status": "en curso"
}
Resultado

Tarea actualizada correctamente.

Evidencia

7. Eliminar Tarea
Endpoint

DELETE http://localhost:5000/api/tasks/1

Headers

Authorization: Bearer <token>

Resultado

Tarea eliminada correctamente.
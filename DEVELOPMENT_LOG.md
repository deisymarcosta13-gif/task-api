# Bitácora de Desarrollo — DEVELOPMENT_LOG.md

## Uso de Asistentes de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó inteligencia artificial como apoyo para resolver dudas técnicas, mejorar la estructura del código y entender conceptos nuevos. Sin embargo, todas las decisiones finales fueron analizadas, adaptadas y validadas manualmente.

### Prompt utilizado

Se realizaron consultas orientadas a resolver problemas específicos del desarrollo. Algunos ejemplos fueron:

- "Cómo estructurar una API en Node.js usando arquitectura por capas"
- "Cómo implementar autenticación con JWT en Express y TypeScript"
- "Cómo validar datos de entrada en una API"
- "Cómo documentar endpoints con Swagger en Node.js"
- "Cómo manejar errores personalizados en Express"
- "Cómo hacer un CRUD seguro asociado a un usuario autenticado"

---

### Qué se aceptó y por qué

Se aceptaron varias partes del código sugerido por la IA cuando cumplían con buenas prácticas y eran coherentes con el proyecto:

- Implementación de autenticación con JWT (generación y verificación de tokens)
- Uso de bcrypt para el manejo seguro de contraseñas
- Estructura base de controladores, servicios y repositorios
- Ejemplos de documentación con Swagger
- Manejo básico de middlewares para proteger rutas

Estas soluciones fueron aceptadas porque:

- Eran seguras (ej: uso de hash para contraseñas)
- Eran escalables y organizadas
- Se adaptaban a la arquitectura por capas solicitada
- Facilitaban el mantenimiento del código

---

### Qué se rechazó o modificó

No todo el código generado fue utilizado directamente. Se realizaron varias modificaciones importantes:

- Se corrigieron errores en la organización del proyecto (por ejemplo, ubicación incorrecta de rutas en app.ts)
- Se ajustaron nombres de variables y funciones para mantener consistencia
- Se eliminaron fragmentos que no se adaptaban a MySQL
- Se corrigieron respuestas HTTP incorrectas
- Se modificaron validaciones que no eran claras o completas

Estas decisiones se tomaron porque:

- Algunas soluciones no eran compatibles con la base de datos usada
- Había errores de lógica o estructura
- No cumplían completamente con los requisitos de la prueba

---

### Verificación realizada

Para garantizar que el código funcionara correctamente, se realizaron las siguientes verificaciones:

- Pruebas manuales en Postman de todos los endpoints:
  - Registro de usuario
  - Login
  - Creación de tareas
  - Consulta de tareas
  - Actualización de tareas
  - Eliminación de tareas
- Validación del uso correcto del token JWT en rutas protegidas
- Revisión de respuestas HTTP (status codes y mensajes)
- Confirmación de persistencia de datos en la base de datos

---

### Decisiones sin asistencia de IA

Durante el desarrollo del proyecto se tomaron varias decisiones de manera autónoma, demostrando comprensión de los conceptos y capacidad de análisis:

- Se decidió utilizar MySQL en lugar de PostgreSQL debido a limitaciones técnicas del entorno de desarrollo, especialmente problemas de instalación y rendimiento en el equipo.  
- Se implementó manualmente la validación para evitar el registro de usuarios con correos duplicados, verificando previamente su existencia en la base de datos.  
- Se corrigió la estructura del archivo principal `app.ts`, asegurando que las rutas se cargaran correctamente antes de iniciar el servidor.  
- Se detectaron y solucionaron errores en la configuración de rutas, como el uso incorrecto de endpoints en Postman (por ejemplo, omitir el prefijo `/api`).  
- Se realizaron ajustes manuales en el manejo de errores para devolver respuestas HTTP más claras y coherentes.  
- Se validó que cada tarea estuviera correctamente asociada al usuario autenticado, evitando accesos indebidos a información de otros usuarios.  
- Se solucionaron problemas relacionados con puertos incorrectos al momento de realizar pruebas, identificando inconsistencias entre la configuración del servidor y las peticiones en Postman.  
- Se detectaron problemas donde los cambios en el código no se reflejaban inmediatamente, resolviéndolos mediante reinicio del servidor (`nodemon`) y verificación del entorno.  
- Se decidió mantener la simplicidad en las validaciones para evitar romper funcionalidades ya implementadas, priorizando la estabilidad del sistema.  

---

## Retos y Soluciones

Durante el desarrollo del proyecto se presentaron diversos problemas técnicos que fueron solucionados mediante análisis, pruebas y depuración del código.

### Problemas con rutas (Cannot POST)

Uno de los errores más frecuentes fue el mensaje:

Cannot POST /auth/register

Este problema se debía a:

- Uso incorrecto de la ruta (faltaba el prefijo `/api`)
- Mala configuración del orden de los middlewares en `app.ts`

Solución:

- Se corrigieron las rutas en Postman (`/api/auth/register`)
- Se reorganizó el archivo `app.ts` para asegurar la correcta carga de rutas

---

### Error ECONNRESET

Se presentó el error:


Error: read ECONNRESET


Causas:

- El servidor se cerraba inesperadamente por errores internos
- Problemas en la conexión con la base de datos
- Fallos en rutas protegidas sin token válido

Solución:

- Se revisaron logs del servidor
- Se verificó la conexión a la base de datos
- Se mejoró el manejo de errores en controladores

---

### Problemas con el puerto

En varias ocasiones las peticiones fallaban porque se usaba un puerto incorrecto en Postman.

Solución:

- Se verificó el puerto configurado en `.env`
- Se unificó el uso del puerto en todo el proyecto

---

### Cambios no reflejados en el código

Se detectó que en algunos casos los cambios realizados no se aplicaban inmediatamente.

Causas:

- Nodemon no detectaba cambios correctamente
- Archivos no guardados

Solución:

- Reinicio manual del servidor
- Verificación de guardado de archivos

---

### Problemas con autenticación JWT

Se presentaron errores al acceder a rutas protegidas:

- Token no enviado
- Token inválido

Solución:

- Se verificó el uso correcto del header:


Authorization: Bearer <token>


- Se ajustó el middleware de autenticación

---

### Elección de base de datos

Se intentó utilizar PostgreSQL, pero surgieron dificultades:

- Problemas de instalación
- Limitaciones del entorno

Solución:

- Se decidió utilizar MySQL
- Se dejó la estructura preparada para facilitar migración futura
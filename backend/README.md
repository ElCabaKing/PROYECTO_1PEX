# Backend - PROYECTO_1PEX

API REST para el sistema de gestión de reparaciones, construida con Node.js y Express.

## Tecnologías

- Node.js
- Express.js
- JWT para autenticación
- Socket.io para comunicación en tiempo real
- MySQL con Sequelize
- bcrypt para hashing de contraseñas

## Instalación

1. Navega al directorio backend:
   ```bash
   cd backend
   npm install
   ```

2. Configura `.env`:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_db
   JWT_SECRET=your_secret
   ```

3. Ejecuta:
   ```bash
   npm start
   ```

## Estructura

- `src/modules/`: Módulos por dominio (auth, login, repair, user)
- `src/middleware/`: Autenticación y roles
- `src/utils/`: Utilidades (errores, cookies, JWT)
- `src/config/`: Configuración de DB

## Endpoints Principales

- `POST /login`: Autenticación
- `GET /repair/getRepairList`: Lista de reparaciones
- `POST /user/createUser`: Crear usuario

## Desarrollo

- Usa `npm run dev` para desarrollo con nodemon.
- Tests: `npm test` (si implementados).

## Notas de Seguridad

- Tokens JWT en cookies HttpOnly.
- Validación de entrada en controladores.
- Manejo de errores centralizado.
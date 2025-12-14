# PROYECTO_1PEX

Un sistema de gestión de reparaciones full-stack que permite a usuarios y administradores manejar trabajos de reparación, usuarios y autenticación.

## Tecnologías

- **Frontend**: React, Axios, CSS Modules
- **Backend**: Node.js, Express, JWT, Socket.io, MySQL
- **Base de Datos**: MySQL con Sequelize
- **Contenedorización**: Docker, Docker Compose

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ElCabaKing/PROYECTO_1PEX.git
   cd PROYECTO_1PEX
   ```

2. Instala dependencias:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Configura variables de entorno:
   - Copia `.env.example` a `.env` en `backend/` y configura DB, JWT, etc.

4. Levanta los servicios con Docker:
   ```bash
   docker-compose up --build
   ```

## Uso

- Accede al frontend en `http://localhost:3000`
- API backend en `http://localhost:5000`
- Usa Postman o similar para probar endpoints.

## Estructura del Proyecto

- `backend/`: API REST con módulos (auth, login, repair, user)
- `frontend/`: Aplicación React con componentes y hooks
- `initdb/`: Scripts SQL para inicializar la base de datos
- `docker-compose.yml`: Configuración de contenedores

## Contribución

1. Fork el repo.
2. Crea una rama para tu feature.
3. Commit y push.
4. Abre un PR.

## Licencia

MIT
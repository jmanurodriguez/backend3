# AdoptMe API - Backend III

Sistema de gestión de adopciones de mascotas con funcionalidades de mocking y testing.

## 🚀 Características

- ✅ API REST para gestión de usuarios, mascotas, adopciones y sesiones
- ✅ Sistema de mocking para generar datos de prue## 🔧 Configuración

### Variables de entorno
El proyecto utiliza archivos `.env` para la configuración:

```bash
# Copiar archivo de ejemplo
cp .env.example .env
```

**Archivos de configuración:**
- ✅ `.env` - Configuración de desarrollo
- ✅ `.env.test` - Configuración para tests
- ✅ `.env.example` - Plantilla con variables disponibles

**Variables disponibles:**
```bash
# Puerto del servidor
PORT=8080

# Entorno de ejecución
NODE_ENV=development

# Base de datos MongoDB
MONGO_URL=mongodb://localhost:27017/db_example
MONGO_DB_NAME=db_example

# JWT Secret
JWT_SECRET=your-secret-key-here

# Configuración de CORS
CORS_ORIGIN=http://localhost:3000

# Directorio de archivos
UPLOAD_DIR=./src/public/img

# Nivel de logs
LOG_LEVEL=debug
```

### Configuración por ambiente:
- **Development**: Usa `.env`
- **Testing**: Usa `.env.test` automáticamente
- **Production**: Usa variables del sistema o `.env.production` ✅ Tests funcionales con Mocha y Supertest
- ✅ Base de datos MongoDB con Mongoose
- ✅ Autenticación JWT con cookies
- ✅ Encriptación de contraseñas con bcrypt

## 📋 Requisitos

- Node.js v20+
- MongoDB v6+
- npm v8+

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd RecursosBackend-Adoptme-main
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env con tus configuraciones
```

4. Asegúrate de que MongoDB esté ejecutándose en:
```
mongodb://localhost:27017/db_example
```

## 🎯 Scripts disponibles

```bash
# Iniciar servidor en producción
npm start

# Iniciar servidor en modo desarrollo con nodemon
npm run dev

# Ejecutar tests
npm test
```

## 📡 Endpoints de la API

### Base URL: `http://localhost:8080`

### 📖 Documentación API
- `GET /api-docs` - Documentación interactiva con Swagger UI

### 🏥 Health Check
- `GET /health` - Estado del servidor y conexión a BD

### 👥 Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener usuario por ID
- `PUT /api/users/:uid` - Actualizar usuario
- `DELETE /api/users/:uid` - Eliminar usuario

### 🐕 Mascotas
- `GET /api/pets` - Obtener todas las mascotas
- `POST /api/pets` - Crear nueva mascota
- `POST /api/pets/withimage` - Crear mascota con imagen
- `PUT /api/pets/:pid` - Actualizar mascota
- `DELETE /api/pets/:pid` - Eliminar mascota

### 🤝 Adopciones
- `GET /api/adoptions` - Obtener todas las adopciones
- `GET /api/adoptions/:aid` - Obtener adopción por ID
- `POST /api/adoptions/:uid/:pid` - Crear nueva adopción

### 🔐 Sesiones
- `POST /api/sessions/register` - Registrar nuevo usuario
- `POST /api/sessions/login` - Iniciar sesión
- `GET /api/sessions/current` - Usuario actual (protegido)
- `POST /api/sessions/unprotectedLogin` - Login sin protección
- `GET /api/sessions/unprotectedCurrent` - Usuario actual (sin protección)

## 🎭 Endpoints de Mocking

### Base: `/api/mocks`

#### `GET /api/mocks/mockingpets`
Genera mascotas ficticias para pruebas.

**Parámetros:**
- `count` (query, opcional): Número de mascotas a generar (default: 100)

**Ejemplo:**
```bash
curl "http://localhost:8080/api/mocks/mockingpets?count=5"
```

**Respuesta:**
```json
{
  "status": "success",
  "payload": [
    {
      "name": "Luna",
      "specie": "dog",
      "birthDate": "2020-05-15T00:00:00.000Z",
      "adopted": false,
      "image": ""
    }
  ]
}
```

#### `GET /api/mocks/mockingusers`
Genera usuarios ficticios con características específicas.

**Parámetros:**
- `count` (query, opcional): Número de usuarios a generar (default: 50)

**Características de usuarios generados:**
- ✅ Password: "coder123" (encriptada con bcrypt)
- ✅ Role: "user" o "admin" (aleatorio)
- ✅ Pets: Array vacío []
- ✅ Email único para evitar conflictos
- ✅ Formato compatible con MongoDB

**Ejemplo:**
```bash
curl "http://localhost:8080/api/mocks/mockingusers?count=3"
```

**Respuesta:**
```json
{
  "status": "success",
  "payload": [
    {
      "first_name": "Juan",
      "last_name": "Pérez",
      "email": "juan.perez.0.1691234567890@example.com",
      "password": "$2b$10$...",
      "role": "user",
      "pets": []
    }
  ]
}
```

#### `POST /api/mocks/generateData`
Genera e inserta datos directamente en la base de datos.

**Body JSON:**
```json
{
  "users": 10,
  "pets": 15
}
```

**Ejemplo:**
```bash
curl -X POST "http://localhost:8080/api/mocks/generateData" \
  -H "Content-Type: application/json" \
  -d '{"users": 5, "pets": 10}'
```

**Respuesta:**
```json
{
  "status": "success",
  "payload": {
    "users": 5,
    "pets": 10
  }
}
```

## 🧪 Testing

El proyecto incluye una suite completa de tests funcionales:

### Ejecutar tests:
```bash
npm test
```

### Tests incluidos:
- ✅ **Adoptions Router**: Suite completa de tests funcionales
  - `GET /api/adoptions` - Obtener todas las adopciones
  - `GET /api/adoptions/:aid` - Obtener adopción específica por ID
  - `POST /api/adoptions/:uid/:pid` - Crear nueva adopción
  - Casos de error (usuario inexistente, mascota inexistente, mascota ya adoptada)
  - Tests de integración y workflow completo
- ✅ **Mocks Router**: Validación de endpoints de mocking
- ✅ **GenerateData**: Inserción en BD y verificación

### Estructura de tests:
```
src/test/
├── adoptions.test.js     # Tests funcionales completos de adoptions
├── generateData.test.js  # Tests de generación de datos
└── mocks.test.js        # Tests de endpoints de mocking
```

### Cobertura:
- 13 tests passing
- Integración con MongoDB
- Validación de respuestas y estados HTTP
- Tests de casos exitosos y de error
- Verificación de integridad de datos

## 🗄️ Estructura del Proyecto

```
├── .env.example          # Plantilla de variables de entorno
├── .env                  # Variables de entorno (development)
├── .env.test            # Variables de entorno (testing)
├── .gitignore           # Archivos ignorados por git
├── package.json         # Dependencias y scripts
├── README.md           # Documentación del proyecto
└── src/
    ├── config/           # Configuración del proyecto
    │   └── environment.js  # Carga de variables de entorno
    ├── controllers/      # Lógica de controladores
    │   ├── adoptions.controller.js
    │   ├── mocks.controller.js
    │   ├── pets.controller.js
    │   ├── sessions.controller.js
    │   └── users.controller.js
    ├── routes/           # Definición de rutas
    │   ├── adoption.router.js
    │   ├── mocks.router.js
    │   ├── pets.router.js
    │   ├── sessions.router.js
    │   └── users.router.js
    ├── docs/             # Documentación Swagger
    │   └── swagger.config.js
    ├── services/         # Capa de servicios
    ├── dao/              # Data Access Objects
    ├── dto/              # Data Transfer Objects
    ├── utils/            # Utilidades
    │   ├── mocking.js    # Generadores de datos ficticios
    │   ├── index.js      # Funciones de utilidad
    │   └── uploader.js   # Configuración de multer
    ├── test/             # Tests funcionales
    │   ├── adoptions.test.js # Tests de adopciones
    │   ├── generateData.test.js
    │   └── mocks.test.js
    └── app.js            # Configuración principal
```

## � Documentación de la API

### Swagger UI
El proyecto incluye documentación interactiva completa usando Swagger/OpenAPI 3.0.

**Acceso:** `http://localhost:8080/api-docs`

**Características:**
- ✅ Documentación completa del módulo Users
- ✅ Esquemas de datos definidos
- ✅ Ejemplos de request/response
- ✅ Interfaz interactiva para probar endpoints
- ✅ Códigos de estado HTTP documentados

**Módulos documentados:**
- 👥 **Users**: CRUD completo de usuarios
  - `GET /api/users` - Listar todos los usuarios
  - `GET /api/users/:uid` - Obtener usuario por ID
  - `PUT /api/users/:uid` - Actualizar usuario
  - `DELETE /api/users/:uid` - Eliminar usuario

## �🔧 Configuración

### Variables de entorno:
- `PORT`: Puerto del servidor (default: 8080)
- `NODE_ENV`: Entorno de ejecución (test/development/production)

### Base de datos:
- URL: `mongodb://localhost:27017/db_example`
- Colecciones: `users`, `pets`, `adoptions`

## 📖 Ejemplos de uso

### 1. Generar datos de prueba:
```bash
# Generar 10 usuarios y 20 mascotas en la BD
curl -X POST "http://localhost:8080/api/mocks/generateData" \
  -H "Content-Type: application/json" \
  -d '{"users": 10, "pets": 20}'
```

### 2. Verificar inserción:
```bash
# Ver usuarios creados
curl "http://localhost:8080/api/users"

# Ver mascotas creadas
curl "http://localhost:8080/api/pets"
```

### 3. Crear adopción:
```bash
# Crear adopción (reemplazar IDs reales)
curl -X POST "http://localhost:8080/api/adoptions/USER_ID/PET_ID"
```

## 🐛 Troubleshooting

### Error de conexión a MongoDB:
```bash
# Verificar que MongoDB esté ejecutándose
mongosh mongodb://localhost:27017/db_example
```

### Puerto en uso:
```bash
# Cambiar puerto en el archivo o variable de entorno
PORT=3000 npm start
```

### Tests fallando:
```bash
# Verificar conexión a MongoDB durante tests
NODE_ENV=test npm test
```

## 📝 Notas importantes

1. **Usuarios de prueba**: Todos tienen password "coder123"
2. **Emails únicos**: Se genera un timestamp para evitar duplicados
3. **Tests**: Usan la misma BD pero en modo test
4. **Adopciones**: Una mascota solo puede ser adoptada una vez

## 🏆 Criterios de entrega cumplidos

- ✅ Router `/api/mocks` creado y funcional
- ✅ Endpoint `/mockingpets` migrado exitosamente
- ✅ Módulo de mocking con usuarios según especificaciones
- ✅ Endpoint `/mockingusers` con 50 usuarios por defecto
- ✅ Endpoint `/generateData` para inserción en BD
- ✅ Verificación mediante servicios GET de users y pets
- ✅ Tests funcionales completos

---

**Desarrollado para Backend III - Testing y Escalabilidad Backend**

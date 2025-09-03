# AdoptMe API - Backend III

Sistema de gestión de adopciones de mascotas con funcionalidades de mocking, testing y Docker.

## 🚀 Inicio Rápido

### Opción 1: Docker (Recomendado) 🐳
```bash
# Ejecutar aplicación completa desde DockerHub
git clone <repository-url>
cd RecursosBackend-Adoptme-main
docker-compose up -d

# ¡Listo! Aplicación disponible en http://localhost:8080
```

### Opción 2: Ejecución Individual
```bash
# Solo la aplicación desde DockerHub
docker run -p 8080:8080 \
  -e MONGO_URL=mongodb://host.docker.internal:27017/adoptme \
  jmanurodriguez/adoptme-api:latest
```

## 🚀 Características

- ✅ API REST para gestión de usuarios, mascotas, adopciones y sesiones
- ✅ Sistema de mocking para generar datos de prueba
- ✅ Tests funcionales con Mocha y Supertest
- ✅ Base de datos MongoDB con Mongoose
- ✅ Autenticación JWT con cookies
- ✅ Encriptación de contraseñas con bcrypt
- ✅ **Documentación Swagger/OpenAPI 3.0**
- ✅ **Configuración por entornos (.env)**
- ✅ **Dockerización completa**
- ✅ **Imagen en DockerHub pública**

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

### Instalación Local
- Node.js v18+
- MongoDB v6+
- npm v8+

### Instalación con Docker
- Docker v20+
- Docker Compose v2+

## 🛠️ Instalación

### Opción 1: Docker (Recomendado)
```bash
# Clonar repositorio
git clone <repository-url>
cd RecursosBackend-Adoptme-main

# Ejecutar con Docker Compose
npm run docker:prod
```

### Opción 2: Instalación Local
```bash
# Clonar repositorio
git clone <repository-url>
cd RecursosBackend-Adoptme-main

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Asegurar MongoDB ejecutándose
# mongodb://localhost:27017/db_example

# Iniciar aplicación
npm start
```

## 🎯 Scripts disponibles

```bash
# Desarrollo
npm start                # Iniciar servidor en producción
npm run dev             # Iniciar servidor en modo desarrollo con nodemon
npm test                # Ejecutar tests

# Docker
npm run docker:build    # Construir imagen Docker
npm run docker:run      # Ejecutar contenedor individual
npm run docker:dev      # Modo desarrollo con Docker Compose
npm run docker:prod     # Modo producción con Docker Compose + MongoDB
npm run docker:logs     # Ver logs de contenedores
npm run docker:stop     # Detener servicios Docker
```

## 🐳 Docker

### 🚀 Imagen en DockerHub
La aplicación está disponible como imagen Docker pública:

**🔗 Link de la imagen:** `https://hub.docker.com/r/jmanurodriguez/adoptme-api`

### 🌍 Acceso Público - Sin Autenticación Requerida

**✅ IMAGEN COMPLETAMENTE PÚBLICA**
- Cualquier persona puede descargar la imagen sin login
- No se requiere cuenta de DockerHub para usar la imagen
- Accesible globalmente para evaluación y uso

### Ejecución rápida desde DockerHub
```bash
# ✅ IMAGEN DISPONIBLE PÚBLICAMENTE (Sin login requerido)
docker pull jmanurodriguez/adoptme-api:latest

# ✅ FUNCIONANDO CORRECTAMENTE
docker run -p 8080:8080 \
  -e MONGO_URL=mongodb://host.docker.internal:27017/adoptme \
  jmanurodriguez/adoptme-api:latest

# ✅ ACCESO A DOCUMENTACIÓN
# http://localhost:8080/api-docs (cuando la aplicación esté corriendo)

# O con Docker Compose usando imagen de DockerHub
docker-compose up -d
```

### 📋 Verificación de Acceso Público

**Comandos que cualquier persona puede ejecutar sin autenticación:**

```bash
# Descargar imagen (sin login)
docker pull jmanurodriguez/adoptme-api:latest

# Verificar imagen descargada
docker images | findstr adoptme

# Ejecutar aplicación completa
docker run --rm -p 8080:8080 jmanurodriguez/adoptme-api:latest
```

**Acceso garantizado para:**
- ✅ **Profesores**: Evaluación directa sin setup adicional
- ✅ **Estudiantes**: Reproducción inmediata del proyecto  
- ✅ **Desarrollo**: Uso en cualquier entorno Docker
- ✅ **Producción**: Despliegue en servidores remotos

### Ejecución local con código fuente
```bash
# Construir y ejecutar con Docker Compose (recomendado)
npm run docker:prod

# O manualmente
docker-compose up --build -d
```

### Imagen Docker
- ✅ **Multi-stage build** para optimización
- ✅ **Usuario no-root** para seguridad
- ✅ **Health check** integrado
- ✅ **Imagen Alpine** (tamaño reducido)
- ✅ **Variables de entorno** configurables
- ✅ **Disponible en DockerHub** públicamente

### Servicios incluidos
- **AdoptMe API**: Puerto 8080
- **MongoDB**: Puerto 27017
- **Health Check**: `/health`
- **Swagger Docs**: `/api-docs`

### Configuración Docker
```yaml
# Variables de entorno recomendadas
NODE_ENV=production
MONGO_URL=mongodb://mongo:27017/adoptme_prod
JWT_SECRET=your-secure-secret-key
CORS_ORIGIN=https://your-domain.com
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
├── .dockerignore        # Archivos ignorados por Docker
├── Dockerfile           # Imagen Docker multi-stage
├── docker-compose.yml   # Servicios Docker para producción
├── docker-compose.dev.yml # Servicios Docker para desarrollo
├── docker-guide.md      # Guía de uso de Docker
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

## 🏆 Criterios de entrega cumplidos

### ✅ Documentación Swagger
- **Módulo Users completamente documentado** con OpenAPI 3.0
- Interfaz interactiva disponible en `/api-docs`
- Esquemas de datos, ejemplos y códigos de respuesta
- Integración completa con Express

### ✅ Tests Funcionales - Adoption Router
- **Cobertura completa** de todos los endpoints:
  - `GET /api/adoptions` - Listar adopciones
  - `GET /api/adoptions/:aid` - Obtener por ID
  - `POST /api/adoptions/:uid/:pid` - Crear adopción
- **Casos de éxito y error** implementados:
  - Usuario inexistente (404)
  - Mascota inexistente (404) 
  - Mascota ya adoptada (400)
  - Validación de integridad de datos
- **13 tests passing** con Mocha y Supertest

### ✅ Dockerfile
- **Multi-stage build** para optimización
- **Usuario no-root** para seguridad
- **Imagen Alpine** para tamaño mínimo
- **Health check integrado**
- **Variables de entorno configurables**
- **Reproducible** y listo para producción

### ✅ DockerHub
- **Imagen pública** disponible: `jmanurodriguez/adoptme-api`
- **Acceso sin autenticación**: Cualquier persona puede usar `docker pull`
- **URL pública**: https://hub.docker.com/r/jmanurodriguez/adoptme-api
- **Tags disponibles**: `latest` y versiones específicas
- **Accesible globalmente** para despliegue
- **Docker Compose** configurado para usar imagen pública

### ✅ README.md Completo
- **Instrucciones detalladas** de instalación
- **Documentación Docker** completa
- **Enlaces a DockerHub** y recursos
- **Guías de uso** paso a paso
- **Variables de entorno** documentadas
- **Acceso público confirmado** - Sin autenticación requerida

### 🌍 Información de Entrega

**Para evaluación del proyecto:**
- **Imagen DockerHub**: https://hub.docker.com/r/jmanurodriguez/adoptme-api
- **Acceso**: Público, sin login requerido
- **Comando directo**: `docker pull jmanurodriguez/adoptme-api:latest`
- **Documentación**: Swagger UI en `http://localhost:8080/api-docs`
- **Tests**: 13 tests funcionales pasando
- **Estado**: ✅ Completamente funcional y accesible

---

**Desarrollado para Backend III - Testing y Escalabilidad Backend Por Juan Manuel Rodriguez**

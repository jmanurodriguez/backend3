# 🚀 Guía de Despliegue - AdoptMe API

## Opciones de Despliegue

### 1. Despliegue Local con Docker Compose (Recomendado)

```bash
# Clonar repositorio
git clone https://github.com/jmanurodriguez/backend3.git
cd backend3

# Ejecutar aplicación completa
docker-compose up -d

# Verificar estado
docker-compose ps
docker-compose logs -f app
```

**URLs disponibles:**
- API: http://localhost:8080
- Health: http://localhost:8080/health
- Swagger: http://localhost:8080/api-docs
- MongoDB: localhost:27017

### 2. Despliegue en Producción

#### Usando DockerHub (Más rápido)
```bash
# Descargar docker-compose.yml
wget https://raw.githubusercontent.com/jmanurodriguez/backend3/main/docker-compose.yml

# Configurar variables de entorno
export JWT_SECRET=your-super-secure-secret-key
export MONGO_URL=mongodb://mongo:27017/adoptme_prod

# Ejecutar
docker-compose up -d
```

#### Construyendo imagen local
```bash
# Clonar y construir
git clone https://github.com/jmanurodriguez/backend3.git
cd backend3

# Construir imagen
docker build -t adoptme-api .

# Ejecutar con base de datos externa
docker run -p 8080:8080 \
  -e NODE_ENV=production \
  -e MONGO_URL=mongodb://your-mongo-host:27017/adoptme \
  -e JWT_SECRET=your-secret-key \
  adoptme-api
```

### 3. Despliegue en la Nube

#### AWS ECS/Fargate
```bash
# Usar imagen pública
jmanurodriguez/adoptme-api:latest

# Variables de entorno necesarias
NODE_ENV=production
MONGO_URL=mongodb://your-mongo-atlas-url/adoptme
JWT_SECRET=your-secret-key
PORT=8080
```

#### Google Cloud Run
```bash
# Desplegar desde DockerHub
gcloud run deploy adoptme-api \
  --image=jmanurodriguez/adoptme-api:latest \
  --platform=managed \
  --region=us-central1 \
  --allow-unauthenticated \
  --port=8080 \
  --set-env-vars="NODE_ENV=production,MONGO_URL=your-mongo-url,JWT_SECRET=your-secret"
```

#### Heroku (Container Registry)
```bash
# Login a Heroku
heroku login
heroku container:login

# Crear app
heroku create your-adoptme-api

# Usar imagen de DockerHub
heroku container:push web --app your-adoptme-api --arg image=jmanurodriguez/adoptme-api:latest
heroku container:release web --app your-adoptme-api

# Configurar variables
heroku config:set NODE_ENV=production --app your-adoptme-api
heroku config:set MONGO_URL=your-mongo-url --app your-adoptme-api
heroku config:set JWT_SECRET=your-secret --app your-adoptme-api
```

## Variables de Entorno de Producción

### Obligatorias
```bash
NODE_ENV=production
MONGO_URL=mongodb://your-host:27017/adoptme_prod
JWT_SECRET=your-super-secure-random-secret-key
```

### Opcionales
```bash
PORT=8080
CORS_ORIGIN=https://your-frontend-domain.com
LOG_LEVEL=warn
UPLOAD_DIR=./src/public/img
```

## Base de Datos

### MongoDB Atlas (Recomendado para producción)
1. Crear cluster en https://cloud.mongodb.com/
2. Configurar usuario y contraseña
3. Obtener connection string
4. Usar como MONGO_URL

### MongoDB Local
```bash
# Docker
docker run -d \
  --name mongo-adoptme \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:6.0
```

## Verificación de Despliegue

### Health Check
```bash
curl https://your-domain.com/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "environment": "production",
  "port": 8080,
  "db": 1
}
```

### Endpoints principales
- `GET /health` - Estado del servidor
- `GET /api-docs` - Documentación Swagger
- `GET /api/users` - Listar usuarios
- `GET /api/pets` - Listar mascotas
- `GET /api/adoptions` - Listar adopciones

## Monitoreo

### Logs
```bash
# Docker Compose
docker-compose logs -f app

# Docker individual
docker logs -f container-name

# Cloud platforms
# Usar sus sistemas de logging respectivos
```

### Métricas
- Health endpoint: `/health`
- Status de MongoDB en respuesta
- Tiempo de respuesta de API

## Seguridad

### Checklist de Producción
- ✅ Usuario no-root en contenedor
- ✅ JWT_SECRET seguro y único
- ✅ CORS configurado correctamente
- ✅ HTTPS habilitado (reverse proxy)
- ✅ MongoDB con autenticación
- ✅ Firewall configurado
- ✅ Variables de entorno seguras

### Recomendaciones
1. **Usar HTTPS** siempre en producción
2. **Configurar CORS** solo para dominios necesarios
3. **JWT_SECRET** de al menos 32 caracteres aleatorios
4. **MongoDB** con usuario y contraseña
5. **Backup** de base de datos regulares

## Troubleshooting

### Problemas Comunes

**Error: Cannot connect to MongoDB**
```bash
# Verificar URL de conexión
echo $MONGO_URL

# Probar conexión
docker run --rm mongo:6.0 mongosh $MONGO_URL --eval "db.adminCommand('ping')"
```

**Error: Puerto en uso**
```bash
# Verificar procesos usando el puerto
netstat -tulpn | grep :8080

# Cambiar puerto
export PORT=3000
```

**Error: Health check fallando**
```bash
# Verificar logs del contenedor
docker logs container-name

# Verificar endpoint manualmente
curl http://localhost:8080/health
```

## Contacto y Soporte

- **GitHub**: https://github.com/jmanurodriguez/backend3
- **DockerHub**: https://hub.docker.com/r/jmanurodriguez/adoptme-api
- **Issues**: https://github.com/jmanurodriguez/backend3/issues

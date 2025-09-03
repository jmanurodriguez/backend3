# Scripts de Docker para AdoptMe API

## Construcción y ejecución

### Construir la imagen
```bash
docker build -t adoptme-api .
```

### Ejecutar contenedor individual
```bash
docker run -p 8080:8080 adoptme-api
```

### Ejecutar con variables de entorno
```bash
docker run -p 8080:8080 \
  -e MONGO_URL=mongodb://host.docker.internal:27017/adoptme \
  -e JWT_SECRET=your-secret-key \
  adoptme-api
```

## Docker Compose

### Desarrollo (con hot reload)
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Producción (aplicación + MongoDB)
```bash
docker-compose up --build -d
```

### Ver logs
```bash
docker-compose logs -f
```

### Detener servicios
```bash
docker-compose down
```

## Scripts NPM

```bash
# Construcción de imagen
npm run docker:build

# Ejecución individual
npm run docker:run

# Modo desarrollo con Docker Compose
npm run docker:dev

# Modo producción con Docker Compose
npm run docker:prod

# Ver logs
npm run docker:logs

# Detener servicios
npm run docker:stop
```

## Configuración de producción

### Variables de entorno recomendadas:
- `NODE_ENV=production`
- `MONGO_URL=mongodb://your-mongo-host:27017/adoptme_prod`
- `JWT_SECRET=your-secure-secret-key`
- `CORS_ORIGIN=https://your-frontend-domain.com`
- `LOG_LEVEL=warn`

### Health Check
La imagen incluye un health check automático en `/health`

### Seguridad
- Usuario no-root (`adoptme`)
- Imagen Alpine (mínima)
- Multi-stage build
- Dependencies de producción únicamente

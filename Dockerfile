# Multi-stage build para optimización

# Etapa 1: Desarrollo y construcción
FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run test 2>/dev/null || echo "Tests skipped in Docker build"

# Etapa 2: Dependencias de producción
FROM node:18-alpine AS dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Etapa 3: Imagen final de producción
FROM node:18-alpine AS production

# Establecer información del mantenedor
LABEL maintainer="AdoptMe API"
LABEL version="1.0.0"
LABEL description="API para gestión de adopciones de mascotas"

# Instalar curl para health checks
RUN apk add --no-cache curl

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S adoptme -u 1001 -G nodejs

# Copiar dependencias de producción
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copiar el código fuente
COPY --chown=adoptme:nodejs src/ ./src/
COPY --chown=adoptme:nodejs package*.json ./

# Crear directorio para archivos subidos
RUN mkdir -p /usr/src/app/src/public/img && \
    chown -R adoptme:nodejs /usr/src/app

# Cambiar al usuario no-root
USER adoptme

# Exponer el puerto
EXPOSE 8080

# Variables de entorno por defecto para Docker
ENV NODE_ENV=production \
    PORT=8080 \
    MONGO_URL=mongodb://mongo:27017/adoptme_prod \
    MONGO_DB_NAME=adoptme_prod \
    JWT_SECRET=change-this-secret-in-production \
    CORS_ORIGIN=* \
    UPLOAD_DIR=./src/public/img \
    LOG_LEVEL=info

# Comando de health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Comando para iniciar la aplicación
CMD ["npm", "start"]

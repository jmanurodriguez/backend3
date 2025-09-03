# Instrucciones para subir a DockerHub

## Preparación

1. **Crear cuenta en DockerHub** (si no tienes)
   - Ve a https://hub.docker.com/
   - Registrarse con email y crear username

2. **Iniciar sesión en Docker desde terminal**
   ```bash
   docker login
   # Ingresar username y password de DockerHub
   ```

## Construcción y etiquetado

3. **Construir la imagen**
   ```bash
   docker build -t adoptme-api .
   ```

4. **Etiquetar para DockerHub**
   ```bash
   # Reemplazar 'tu-username' con tu username de DockerHub
   docker tag adoptme-api tu-username/adoptme-api:latest
   docker tag adoptme-api tu-username/adoptme-api:v1.0.0
   ```

## Subida a DockerHub

5. **Subir la imagen**
   ```bash
   docker push tu-username/adoptme-api:latest
   docker push tu-username/adoptme-api:v1.0.0
   ```

## Verificación

6. **Probar descarga**
   ```bash
   docker pull tu-username/adoptme-api:latest
   docker run -p 8080:8080 tu-username/adoptme-api:latest
   ```

## Ejemplo con usuario ficticio

```bash
# Ejemplo con usuario 'jmanurodriguez'
docker build -t adoptme-api .
docker tag adoptme-api jmanurodriguez/adoptme-api:latest
docker tag adoptme-api jmanurodriguez/adoptme-api:v1.0.0
docker push jmanurodriguez/adoptme-api:latest
docker push jmanurodriguez/adoptme-api:v1.0.0
```

## URL de la imagen resultante
`https://hub.docker.com/r/tu-username/adoptme-api`

## Uso público de la imagen
```bash
docker run -p 8080:8080 -e MONGO_URL=mongodb://localhost:27017/adoptme tu-username/adoptme-api:latest
```

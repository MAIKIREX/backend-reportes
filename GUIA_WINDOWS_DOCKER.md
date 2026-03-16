# Guía Windows + Docker

## Alcance real de esta guía

Este repositorio no trae `Dockerfile` ni `docker-compose.yml`.

Por eso, la forma más directa de hacerlo correr hoy en Windows es esta:

- PostgreSQL dentro de Docker Desktop
- backend NestJS ejecutándose localmente en Windows

Con la estructura actual del proyecto, esta es la opción más simple y estable.

## Qué necesitas tener instalado

Antes de empezar, verifica esto:

- Docker Desktop para Windows
- Node.js 20 LTS o superior
- npm
- PowerShell

Comandos para validar:

```powershell
docker --version
node --version
npm --version
```

## Cómo levantar PostgreSQL en Docker en Windows

### 1. Descargar la imagen de PostgreSQL

```powershell
docker pull postgres:16
```

### 2. Crear un volumen para no perder los datos

```powershell
docker volume create pgdata_nest_base
```

### 3. Levantar el contenedor

```powershell
docker run -d `
  --name pg16-nest-base `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=database_db `
  -e TZ=America/La_Paz `
  -p 5432:5432 `
  -v pgdata_nest_base:/var/lib/postgresql/data `
  postgres:16
```

Qué hace este comando:

- crea un contenedor llamado `pg16-nest-base`
- expone PostgreSQL en `localhost:5432`
- crea automáticamente la base `database_db`
- persiste la data en el volumen `pgdata_nest_base`

### 4. Verificar que el contenedor esté arriba

```powershell
docker ps
```

Deberías ver el contenedor `pg16-nest-base` en estado `Up`.

### 5. Crear la extensión que necesita la migración

La migración usa `uuid_generate_v4()`, así que debes habilitar `uuid-ossp`.

```powershell
docker exec -it pg16-nest-base psql -U postgres -d database_db -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
```

### 6. Verificar la extensión

```powershell
docker exec -it pg16-nest-base psql -U postgres -d database_db -c '\dx'
```

Debes ver `uuid-ossp` en la lista.

## Configurar el backend en Windows

### 1. Revisar el `.env`

Tu `.env` actual ya está alineado con el contenedor Docker si mantienes estos valores:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=database_db
DB_SCHEMA=
```

Puntos importantes:

- deja `DB_SCHEMA=` vacío
- no uses `DB_SCHEMA=proyecto` para la primera ejecución
- el proyecto funciona mejor inicialmente sobre el esquema por defecto de PostgreSQL

### 2. Instalar dependencias

Si acabas de clonar el repositorio:

```powershell
npm install
```

### 3. Ejecutar migraciones

```powershell
npm run migrations:run
```

Esto crea las tablas:

- `profiles`
- `users`

### 4. Ejecutar el seed inicial

```powershell
npm run seeds:run
```

Esto inserta el administrador inicial:

- email: `admin@local.test`
- password: `Admin123!`

### 5. Levantar la API

```powershell
npm run start:dev
```

También puedes usar:

```powershell
npm run dev
```

Ese comando deja activos logs SQL y logs de consola.

## Cómo probar que ya funciona

### 1. Abrir Swagger

Abre en el navegador:

- `http://localhost:3001/api/docs`

### 2. Hacer login

Usa este body en `POST /api/auth/login`:

```json
{
  "email": "admin@local.test",
  "password": "Admin123!"
}
```

### 3. Copiar el token

La respuesta devuelve:

- `user`
- `access_token`

### 4. Autorizar Swagger

En Swagger, pulsa `Authorize` y pega:

```text
Bearer TU_TOKEN
```

### 5. Probar usuarios

Prueba:

- `GET /api/users`

Si responde, la API quedó funcionando correctamente.

## Comandos útiles en Windows

### Ver logs del contenedor PostgreSQL

```powershell
docker logs pg16-nest-base
```

### Ver logs en vivo

```powershell
docker logs -f pg16-nest-base
```

### Entrar a PostgreSQL dentro del contenedor

```powershell
docker exec -it pg16-nest-base psql -U postgres -d database_db
```

### Detener la base

```powershell
docker stop pg16-nest-base
```

### Volver a iniciarla

```powershell
docker start pg16-nest-base
```

### Eliminar el contenedor

```powershell
docker rm -f pg16-nest-base
```

### Eliminar también los datos

```powershell
docker volume rm pgdata_nest_base
```

Haz esto solo si realmente quieres reiniciar la base desde cero.

## Problemas comunes

### El puerto 5432 ya está ocupado

Levanta el contenedor en otro puerto:

```powershell
docker run -d `
  --name pg16-nest-base `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=database_db `
  -p 5433:5432 `
  -v pgdata_nest_base:/var/lib/postgresql/data `
  postgres:16
```

Y cambia en `.env`:

```env
DB_PORT=5433
```

### La migración falla por `uuid_generate_v4`

Te falta ejecutar:

```powershell
docker exec -it pg16-nest-base psql -U postgres -d database_db -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
```

### El backend no conecta a la base

Revisa:

- que el contenedor esté corriendo con `docker ps`
- que `.env` tenga `DB_HOST=localhost`
- que el puerto en `.env` coincida con el puerto publicado del contenedor

### El script `dbcreate_docker.sh` no corre en Windows

Eso es esperable.

Ese script está hecho para Bash. En Windows puro con PowerShell, es mejor usar directamente los comandos `docker run` y `docker exec` de esta guía.

## Secuencia mínima recomendada

```powershell
docker pull postgres:16
docker volume create pgdata_nest_base
```

```powershell
docker run -d `
  --name pg16-nest-base `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=database_db `
  -e TZ=America/La_Paz `
  -p 5432:5432 `
  -v pgdata_nest_base:/var/lib/postgresql/data `
  postgres:16
```

```powershell
docker exec -it pg16-nest-base psql -U postgres -d database_db -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
```

```powershell
npm install
npm run migrations:run
npm run seeds:run
npm run start:dev
```

Luego abre:

- `http://localhost:3001/api/docs`

## Nota final

Si quieres, en el siguiente paso puedo dejarte el proyecto completamente dockerizado también, agregando:

- `Dockerfile`
- `docker-compose.yml`
- configuración para levantar backend y PostgreSQL con un solo comando


# Guía de puesta en marcha

## Qué hace este proyecto

Este repositorio es un backend base construido con NestJS, TypeORM y PostgreSQL.

Incluye:

- autenticación con `POST /api/auth/login` usando email y contraseña
- generación de JWT para proteger endpoints
- módulo de usuarios con CRUD
- relación `users -> profile` para guardar datos personales básicos
- control de acceso por roles (`admin`, `user`, `seller`)
- documentación Swagger en `/api/docs`
- migraciones y seeds con TypeORM

## Modelo de datos actual

La migración inicial crea dos tablas:

- `profiles`
  - `id`
  - `name`
  - `last_name`
  - `created_at`
  - `updated_at`
- `users`
  - `id` UUID
  - `email` único
  - `password`
  - `role`
  - `perfil_id`
  - `created_at`
  - `updated_at`

Cada usuario tiene un solo perfil.

## Endpoints principales

Con el prefijo por defecto `api`, las rutas quedan así:

- `GET /api` devuelve `Hello World!`
- `POST /api/auth/login` autentica y devuelve el token JWT
- `GET /api/users` lista usuarios, solo `admin`
- `GET /api/users/:id` obtiene un usuario, solo `admin`
- `GET /api/users/:id/profile` obtiene el perfil, solo `admin`
- `POST /api/users` crea usuario, solo `admin`
- `PUT /api/users/:id` actualiza usuario, solo `admin`
- `DELETE /api/users/:id` elimina usuario, solo `admin`
- `GET /api/docs` abre Swagger

## Requisitos

- Node.js
- npm
- PostgreSQL
- opcionalmente Docker si quieres levantar PostgreSQL en contenedor

Recomendación práctica:

- Node.js 20 LTS o superior
- PostgreSQL 14 o superior

## Variables de entorno necesarias

El proyecto no trae `.env.example`, pero por la validación de Nest estas variables son obligatorias o recomendables.

Crea un archivo `.env` en la raíz con este contenido:

```env
NODE_ENV=development
PORT=3001
PATH_SUBDOMAIN=api
REQUEST_TIMEOUT_IN_SECONDS=30
URL_FRONTEND=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=database_db
DB_SCHEMA=
DB_SCHEMA_USUARIOS=
DB_SCHEMA_PARAMETRICAS=
DB_SCHEMA_ENTIDADES=
DB_SCHEMA_RECLAMOS=
DB_USE_SSL=false
DB_VERIFY_SSL=false

LOG_SQL=true

JWT_SECRET=super_secret_local_key
JWT_EXPIRES_IN=300000
REFRESH_TOKEN_NAME=jid
REFRESH_TOKEN_EXPIRES_IN=3600000
REFRESH_TOKEN_ROTATE_IN=900000
REFRESH_TOKEN_SECURE=false
REFRESH_TOKEN_DOMAIN=
REFRESH_TOKEN_PATH=/
REFRESH_TOKEN_REVISIONS=*/5 * * * *
```

## Configuración de la base de datos

### Opción 1: PostgreSQL local

1. Crea la base de datos:

```sql
CREATE DATABASE database_db ENCODING 'UTF8';
```

2. Entra a la base creada y habilita la extensión usada por la migración:

```sql
\c database_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

3. No definas `DB_SCHEMA` al inicio.

Motivo:

- la migración actual crea tablas sin prefijo de esquema
- el script `database/scripts/dbcreate.sql` crea el esquema `proyecto`, pero la aplicación no lo necesita para arrancar
- si configuras `DB_SCHEMA=proyecto` sin ajustar migraciones y entidades, puedes provocar inconsistencias

### Opción 2: PostgreSQL con Docker

Si ya tienes un contenedor PostgreSQL, puedes usar el script del repo:

- script: `database/scripts/dbcreate_docker.sh`
- SQL ejecutado: `database/scripts/dbcreate.sql`

Ejemplo:

```bash
bash database/scripts/dbcreate_docker.sh pg16
```

Después de eso, entra al contenedor o a la base y ejecuta también:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Nota:

- el script está en `.sh`, así que en Windows necesitas Git Bash, WSL o un entorno compatible con Bash

## Paso a paso para hacerlo correr

### 1. Instalar dependencias

Si acabas de clonar el proyecto:

```bash
npm install
```

### 2. Crear el archivo `.env`

Usa el bloque mostrado arriba y ajusta usuario, contraseña y host de PostgreSQL si corresponde.

### 3. Crear la base de datos

Prepara PostgreSQL como se explicó en la sección anterior.

### 4. Ejecutar migraciones

```bash
npm run migrations:run
```

Esto crea las tablas `profiles` y `users`.

### 5. Ejecutar seeds

```bash
npm run seeds:run
```

Esto inserta un usuario administrador inicial:

- email: `admin@local.test`
- password: `Admin123!`

### 6. Levantar el servidor

Modo desarrollo:

```bash
npm run start:dev
```

Modo desarrollo con logs SQL:

```bash
npm run dev
```

La API quedará disponible en:

- `http://localhost:3001/api`
- `http://localhost:3001/api/docs`

## Cómo probar el login

Request:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@local.test",
  "password": "Admin123!"
}
```

La respuesta devuelve:

- `user`
- `access_token`

Usa el token en Swagger o en tus peticiones:

```http
Authorization: Bearer TU_TOKEN
```

## Flujo mínimo de verificación

1. Abre `http://localhost:3001/api/docs`
2. Ejecuta `POST /api/auth/login`
3. Copia el `access_token`
4. Autoriza Swagger con `Bearer <token>`
5. Prueba `GET /api/users`

## Comandos útiles del proyecto

```bash
npm run build
npm run start:dev
npm run migrations:run
npm run migrations:revert
npm run migrations:show
npm run seeds:run
```

Existe además un script de reseteo total:

```bash
npm run setup
```

Pero no lo recomendaría en un entorno nuevo sin revisar antes lo que hace, porque:

- borra migraciones dentro de `database/migrations/*`
- intenta regenerarlas
- hace `schema:drop`

Es más seguro arrancar con `migrations:run` y `seeds:run`.

## Hallazgos importantes al analizar el repo

### 1. La migración necesita `uuid-ossp`

La tabla `users` usa `uuid_generate_v4()`. Si no habilitas esa extensión en PostgreSQL, la migración va a fallar.

### 2. Hay una inconsistencia con el esquema

`database/scripts/dbcreate.sql` crea el esquema `proyecto`, pero el proyecto funciona sin esquema explícito y la migración actual crea tablas sobre el esquema por defecto. Para una primera ejecución, deja `DB_SCHEMA` vacío.

### 3. El build sí compila

Se validó correctamente con:

```bash
npm run build
```

### 4. Los tests actuales no están sanos

Al ejecutar `npm run test`, fallan al menos dos casos:

- `src/application/users/users.service.spec.ts`
  - no mockea el `UserRepository`
- `src/application/users/users.controller.spec.ts`
  - hay un import absoluto que Jest no resuelve en `update-user.dto.ts`

Eso no impide levantar la API, pero sí afecta la validación automática del repositorio.

### 5. El seed tiene un detalle en el `down`

El seed crea el perfil `Martha Tambo`, pero en el `down` intenta borrar `Administrador General`. No afecta el arranque inicial, pero sí deja una reversión inconsistente.

## Secuencia recomendada final

```bash
npm install
```

```sql
CREATE DATABASE database_db ENCODING 'UTF8';
\c database_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

```bash
npm run migrations:run
npm run seeds:run
npm run start:dev
```

Luego abre:

- `http://localhost:3001/api/docs`


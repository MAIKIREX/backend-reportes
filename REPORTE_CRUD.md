# Reporte de implementacion CRUD

## Fuente revisada

Se reviso `isntrucciones/start.md` y se tomo `src/application/users` como referencia para mantener la arquitectura actual del proyecto.

## Modulos creados

Se agregaron los siguientes CRUDs dentro de `src/application`:

1. `daily-performance`
2. `invoice-configurations`
3. `system-registrations`
4. `historical-data`
5. `user-daily-performance`
6. `edge-configurations`

## Estructura aplicada

Cada modulo incluye:

- entidad TypeORM
- DTO de creacion
- DTO de actualizacion
- servicio con operaciones CRUD
- controlador con endpoints REST
- modulo Nest

## Endpoints implementados

En todos los modulos se implemento:

- `POST /...`
- `GET /...`
- `GET /.../:id`
- `PATCH /.../:id`
- `DELETE /.../:id`

## Criterios tecnicos mantenidos

- uso de `TypeOrmModule.forFeature(...)`
- autenticacion con `AuthGuard('jwt')`
- autorizacion con `RolesGuard`
- restriccion por `Role.ADMIN`
- documentacion Swagger
- validaciones con `class-validator`

## Decisiones de modelado

- Se agrego `id` UUID en cada entidad porque el documento fuente no define una clave primaria.
- Las propiedades en TypeScript se normalizaron a `camelCase`.
- Las columnas de base de datos se definieron en `snake_case`.
- Se usaron tipos `date`, `time`, `int`, `decimal`, `boolean` y `varchar` segun la naturaleza de cada campo.

## Integracion

Se actualizo `src/application/application.module.ts` para registrar los nuevos modulos.

## Pendiente importante

La configuracion actual usa `synchronize: false`, por lo que aun necesitas generar y ejecutar migraciones para crear estas tablas en la base de datos.

// ormconfig-default.ts
// DataSource para migraciones “normales” (estructura de tablas, índices, FKs, etc.)
import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'database_db',

  // Schema por defecto; si no usas uno específico, puedes omitirlo o dejar "public"
  schema: process.env.DB_SCHEMA || undefined,

  // SSL opcional, alineado a tu config: DB_USE_SSL / DB_VERIFY_SSL
  ...(process.env.DB_USE_SSL === 'true'
    ? {
        ssl: {
          // Si DB_VERIFY_SSL=false, no rechazará certificados self-signed
          rejectUnauthorized: process.env.DB_VERIFY_SSL === 'true',
        },
      }
    : {}),

  // ¡IMPORTANTE! Nunca usar synchronize en prod cuando trabajas con migraciones
  synchronize: false,

  // Logging similar al que definiste en tu module (sin SQLLogger custom)
  logging: process.env.LOG_SQL === 'true' ? ['query', 'error'] : ['error'],

  // Patrones de entidades y migraciones
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['database/migrations/*.ts'],
});
// ormconfig-seed.ts
// DataSource para semillas (datos base/paramétricos) implementadas como migraciones.
import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'database_db',
  schema: process.env.DB_SCHEMA || undefined,
  ...(process.env.DB_USE_SSL === 'true'
    ? { ssl: { rejectUnauthorized: process.env.DB_VERIFY_SSL === 'true' } }
    : {}),
  synchronize: false,
  logging: process.env.LOG_SQL === 'true' ? ['query', 'error'] : ['error'],

  // Para seeds, apuntamos a otra carpeta
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['database/seeds/base/*.ts'],
});
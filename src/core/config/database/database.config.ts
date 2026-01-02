import { registerAs } from '@nestjs/config';

const toInt = (v: string | undefined, def: number) =>
  v !== undefined && v !== '' ? parseInt(v, 10) : def;

const toBool = (v: string | undefined, def = false) => {
  if (v === undefined) return def;
  return ['true', '1', 'yes', 'y'].includes(v.toLowerCase());
};

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;

  schema?: string;
  
  useSSL: boolean;
  verifySSL: boolean;
  logSql: boolean; // opcional
}

export default registerAs('db', (): DatabaseConfig => ({
  host: process.env.DB_HOST ?? 'localhost',
  port: toInt(process.env.DB_PORT, 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'database_db',

  schema: process.env.DB_SCHEMA || undefined,
  
  useSSL: toBool(process.env.DB_USE_SSL, false),
  verifySSL: toBool(process.env.DB_VERIFY_SSL, false),
  logSql: toBool(process.env.LOG_SQL, false),
}));
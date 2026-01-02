import { registerAs } from '@nestjs/config';

const toInt = (v: string | undefined, def: number) =>
  v !== undefined && v !== '' ? parseInt(v, 10) : def;

export interface AppConfig {
  nodeEnv: 'development' | 'test' | 'production' | string;
  port: number;
  pathSubdomain: string;
  requestTimeoutInSeconds: number;
  urlFrontend: string;
}

export default registerAs('app', (): AppConfig => ({
  nodeEnv: (process.env.NODE_ENV as AppConfig['nodeEnv']) ?? 'development',
  port: toInt(process.env.PORT, 3000),
  pathSubdomain: process.env.PATH_SUBDOMAIN ?? 'api',
  requestTimeoutInSeconds: toInt(process.env.REQUEST_TIMEOUT_IN_SECONDS, 30),
  urlFrontend: process.env.URL_FRONTEND ?? '',
}));
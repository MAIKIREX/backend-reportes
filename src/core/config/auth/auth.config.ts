import { registerAs } from '@nestjs/config';

const toInt = (v: string | undefined, def: number) =>
  v !== undefined && v !== '' ? parseInt(v, 10) : def;

const toBool = (v: string | undefined, def = false) => {
  if (v === undefined) return def;
  return ['true', '1', 'yes', 'y'].includes(v.toLowerCase());
};

export interface AuthConfig {
  jwt: {
    secret: string;
    expiresInMs: number;
  };
  refresh: {
    cookieName: string;
    expiresInMs: number;
    rotateInMs: number;
    secure: boolean;
    domain?: string;
    path: string;
    revisions: string;
  };
}

export default registerAs('auth', (): AuthConfig => ({
  jwt: {
    secret: process.env.JWT_SECRET ?? 'change_me_in_prod',
    expiresInMs: toInt(process.env.JWT_EXPIRES_IN, 300000),
  },
  refresh: {
    cookieName: process.env.REFRESH_TOKEN_NAME ?? 'jid',
    expiresInMs: toInt(process.env.REFRESH_TOKEN_EXPIRES_IN, 3600000),
    rotateInMs: toInt(process.env.REFRESH_TOKEN_ROTATE_IN, 900000),
    secure: toBool(process.env.REFRESH_TOKEN_SECURE, false),
    domain: process.env.REFRESH_TOKEN_DOMAIN || undefined,
    path: process.env.REFRESH_TOKEN_PATH ?? '/',
    revisions: process.env.REFRESH_TOKEN_REVISIONS ?? '*/5 * * * *',
  },
}));
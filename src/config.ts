// src/config.ts
import { registerAs } from '@nestjs/config';

const toInt = (v: string | undefined, def: number) =>
  v !== undefined && v !== '' ? parseInt(v, 10) : def;

const toBool = (v: string | undefined, def = false) => {
  if (v === undefined) return def;
  return ['true', '1', 'yes', 'y'].includes(v.toLowerCase());
};

export default registerAs('config', () => {
  return {
    app: {
      nodeEnv: process.env.NODE_ENV ?? 'development',
      port: toInt(process.env.PORT, 3000),
      pathSubdomain: process.env.PATH_SUBDOMAIN ?? 'api',
      requestTimeoutInSeconds: toInt(process.env.REQUEST_TIMEOUT_IN_SECONDS, 30),
      urlFrontend: process.env.URL_FRONTEND ?? '',
    },
    db: {
      host: process.env.DB_HOST ?? 'localhost',
      port: toInt(process.env.DB_PORT, 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_DATABASE ?? 'database_db',
      schema: process.env.DB_SCHEMA ?? undefined,
      schemaUsuarios: process.env.DB_SCHEMA_USUARIOS ?? undefined,
      schemaParametricas: process.env.DB_SCHEMA_PARAMETRICAS ?? undefined,
      schemaEntidades: process.env.DB_SCHEMA_ENTIDADES ?? undefined,
      schemaReclamos: process.env.DB_SCHEMA_RECLAMOS ?? undefined,
      useSSL: toBool(process.env.DB_USE_SSL, false),
      verifySSL: toBool(process.env.DB_VERIFY_SSL, false),
    },
    jwt: {
      secret: process.env.JWT_SECRET ?? 'change_me_in_prod',
      // Si en tu .env usas milisegundos, queda como número;
      // si prefieres "15m" / "7d", cámbialo a string.
      expiresIn: process.env.JWT_EXPIRES_IN
        ? toInt(process.env.JWT_EXPIRES_IN, 300000)
        : 300000,
    },
    oidc: {
      issuer: process.env.OIDC_ISSUER ?? '',
      clientId: process.env.OIDC_CLIENT_ID ?? '',
      clientSecret: process.env.OIDC_CLIENT_SECRET ?? '',
      scope: process.env.OIDC_SCOPE ?? 'openid profile email',
      redirectUri: process.env.OIDC_REDIRECT_URI ?? '',
      postLogoutRedirectUri: process.env.OIDC_POST_LOGOUT_REDIRECT_URI ?? '',
    },
  };
});

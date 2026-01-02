import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import appConfig from './app/app.config';
import authConfig from './auth/auth.config';
import dbConfig from './database/database.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, dbConfig],
      expandVariables: true,
      validationSchema: Joi.object({
        // App
        NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
        PORT: Joi.number().default(3000),
        PATH_SUBDOMAIN: Joi.string().default('api'),
        REQUEST_TIMEOUT_IN_SECONDS: Joi.number().default(30),
        URL_FRONTEND: Joi.string().allow('').default(''),

        // DB
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_DATABASE: Joi.string().required(),
        DB_SCHEMA: Joi.string().allow(''),
        DB_SCHEMA_USUARIOS: Joi.string().allow(''),
        DB_SCHEMA_PARAMETRICAS: Joi.string().allow(''),
        DB_SCHEMA_ENTIDADES: Joi.string().allow(''),
        DB_SCHEMA_RECLAMOS: Joi.string().allow(''),
        DB_USE_SSL: Joi.boolean().truthy('true', '1', 'yes', 'y').falsy('false', '0', 'no', 'n').default(false),
        DB_VERIFY_SSL: Joi.boolean().truthy('true', '1', 'yes', 'y').falsy('false', '0', 'no', 'n').default(false),

        // Logs
        LOG_SQL: Joi.boolean().truthy('true','1','yes','y').falsy('false','0','no','n').default(false),

        // Auth (JWT + Refresh)
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().default(300000),
        REFRESH_TOKEN_NAME: Joi.string().default('jid'),
        REFRESH_TOKEN_EXPIRES_IN: Joi.number().default(3600000),
        REFRESH_TOKEN_ROTATE_IN: Joi.number().default(900000),
        REFRESH_TOKEN_SECURE: Joi.boolean().truthy('true','1','yes','y').falsy('false','0','no','n').default(false),
        REFRESH_TOKEN_DOMAIN: Joi.string().allow(''),
        REFRESH_TOKEN_PATH: Joi.string().default('/'),
        REFRESH_TOKEN_REVISIONS: Joi.string().default('*/5 * * * *'),
      }),
    }),
  ],
  exports: [NestConfigModule],
})
export class CoreConfigModule {}
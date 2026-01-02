import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import dbConfig from './database.config';
import { LeaderLease } from 'nest-leader-election';

@Module({
  imports: [
    ConfigModule.forFeature(dbConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [dbConfig.KEY],
      useFactory: (db: ConfigType<typeof dbConfig>) => ({
        type: 'postgres',
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.database,
        schema: db.schema,
        ...(db.useSSL ? { ssl: { rejectUnauthorized: db.verifySSL } } : {}),

        // Ajusta estos globs a tu estructura si lo necesitas
        entities: [
          LeaderLease,
          __dirname + '/../../../../**/*.entity{.ts,.js}',
        ],
        subscribers: [__dirname + '/../../../../**/*.subscriber{.ts,.js}'],

        keepConnectionAlive: true,
        synchronize: false,

        // Logging nativo de TypeORM (sin SQLLogger custom)
        logging: db.logSql ? ['query', 'error'] : ['error'],
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}
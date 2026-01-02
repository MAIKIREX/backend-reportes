import { Module } from '@nestjs/common';
import { CoreConfigModule } from './config/config.module';
import { DataBaseModule } from './config/database/database.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    CoreConfigModule, // Config global + validación
    DataBaseModule, AuthModule  // Conexión TypeORM
  ]
})
export class CoreModule {}
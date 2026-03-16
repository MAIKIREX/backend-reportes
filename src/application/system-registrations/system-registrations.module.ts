import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemRegistrationsController } from './system-registrations.controller';
import { SystemRegistrationsService } from './system-registrations.service';
import { SystemRegistration } from './entities/system-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemRegistration])],
  controllers: [SystemRegistrationsController],
  providers: [SystemRegistrationsService],
  exports: [SystemRegistrationsService],
})
export class SystemRegistrationsModule {}

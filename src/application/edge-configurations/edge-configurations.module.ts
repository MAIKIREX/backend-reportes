import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdgeConfigurationsController } from './edge-configurations.controller';
import { EdgeConfigurationsService } from './edge-configurations.service';
import { EdgeConfiguration } from './entities/edge-configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EdgeConfiguration])],
  controllers: [EdgeConfigurationsController],
  providers: [EdgeConfigurationsService],
  exports: [EdgeConfigurationsService],
})
export class EdgeConfigurationsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceConfigurationsController } from './invoice-configurations.controller';
import { InvoiceConfigurationsService } from './invoice-configurations.service';
import { InvoiceConfiguration } from './entities/invoice-configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceConfiguration])],
  controllers: [InvoiceConfigurationsController],
  providers: [InvoiceConfigurationsService],
  exports: [InvoiceConfigurationsService],
})
export class InvoiceConfigurationsModule {}

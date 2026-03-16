import { Module } from '@nestjs/common';
import { DailyPerformanceModule } from './daily-performance/daily-performance.module';
import { EdgeConfigurationsModule } from './edge-configurations/edge-configurations.module';
import { HistoricalDataModule } from './historical-data/historical-data.module';
import { InvoiceConfigurationsModule } from './invoice-configurations/invoice-configurations.module';
import { SystemRegistrationsModule } from './system-registrations/system-registrations.module';
import { UserDailyPerformanceModule } from './user-daily-performance/user-daily-performance.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    DailyPerformanceModule,
    InvoiceConfigurationsModule,
    SystemRegistrationsModule,
    HistoricalDataModule,
    UserDailyPerformanceModule,
    EdgeConfigurationsModule,
  ],
})
export class ApplicationModule {}

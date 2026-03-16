import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyPerformanceController } from './daily-performance.controller';
import { DailyPerformanceService } from './daily-performance.service';
import { DailyPerformance } from './entities/daily-performance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyPerformance])],
  controllers: [DailyPerformanceController],
  providers: [DailyPerformanceService],
  exports: [DailyPerformanceService],
})
export class DailyPerformanceModule {}

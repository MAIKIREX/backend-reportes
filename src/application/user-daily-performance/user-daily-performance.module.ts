import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDailyPerformanceController } from './user-daily-performance.controller';
import { UserDailyPerformanceService } from './user-daily-performance.service';
import { UserDailyPerformance } from './entities/user-daily-performance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDailyPerformance])],
  controllers: [UserDailyPerformanceController],
  providers: [UserDailyPerformanceService],
  exports: [UserDailyPerformanceService],
})
export class UserDailyPerformanceModule {}

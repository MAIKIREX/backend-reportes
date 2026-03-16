import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricalDataController } from './historical-data.controller';
import { HistoricalDataService } from './historical-data.service';
import { HistoricalData } from './entities/historical-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricalData])],
  controllers: [HistoricalDataController],
  providers: [HistoricalDataService],
  exports: [HistoricalDataService],
})
export class HistoricalDataModule {}

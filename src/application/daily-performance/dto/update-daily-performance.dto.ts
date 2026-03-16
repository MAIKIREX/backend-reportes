import { PartialType } from '@nestjs/swagger';
import { CreateDailyPerformanceDto } from './create-daily-performance.dto';

export class UpdateDailyPerformanceDto extends PartialType(
  CreateDailyPerformanceDto,
) {}

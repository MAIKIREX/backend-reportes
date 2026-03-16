import { PartialType } from '@nestjs/swagger';
import { CreateUserDailyPerformanceDto } from './create-user-daily-performance.dto';

export class UpdateUserDailyPerformanceDto extends PartialType(
  CreateUserDailyPerformanceDto,
) {}

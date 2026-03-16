import { PartialType } from '@nestjs/swagger';
import { CreateHistoricalDataDto } from './create-historical-data.dto';

export class UpdateHistoricalDataDto extends PartialType(
  CreateHistoricalDataDto,
) {}

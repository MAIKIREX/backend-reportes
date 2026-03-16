import { PartialType } from '@nestjs/swagger';
import { CreateEdgeConfigurationDto } from './create-edge-configuration.dto';

export class UpdateEdgeConfigurationDto extends PartialType(
  CreateEdgeConfigurationDto,
) {}

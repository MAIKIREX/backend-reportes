import { PartialType } from '@nestjs/swagger';
import { CreateSystemRegistrationDto } from './create-system-registration.dto';

export class UpdateSystemRegistrationDto extends PartialType(
  CreateSystemRegistrationDto,
) {}

import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceConfigurationDto } from './create-invoice-configuration.dto';

export class UpdateInvoiceConfigurationDto extends PartialType(
  CreateInvoiceConfigurationDto,
) {}

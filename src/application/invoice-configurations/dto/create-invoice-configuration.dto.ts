import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceConfigurationDto {
  @ApiProperty({ example: 'LPZ' })
  @IsString()
  @IsNotEmpty()
  readonly simplifiedCity: string;

  @ApiProperty({ example: 'La Paz, El Alto' })
  @IsString()
  @IsNotEmpty()
  readonly cities: string;

  @ApiProperty({ example: 'MO-01' })
  @IsString()
  @IsNotEmpty()
  readonly mo: string;

  @ApiProperty({ example: 'Sabado, Domingo' })
  @IsString()
  @IsNotEmpty()
  readonly breaks: string;

  @ApiProperty({ example: '2026-03-01' })
  @IsDateString()
  @IsNotEmpty()
  readonly startDate: string;

  @ApiProperty({ example: '2026-03-31' })
  @IsDateString()
  @IsNotEmpty()
  readonly endDate: string;
}

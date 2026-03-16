import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSystemRegistrationDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'Perez Gomez' })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  readonly identityNumber: string;

  @ApiProperty({ example: 'Bolivia' })
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @ApiProperty({ example: 'Occidente' })
  @IsString()
  @IsNotEmpty()
  readonly area: string;

  @ApiProperty({ example: 'La Paz' })
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty({ example: '1995-08-20' })
  @IsDateString()
  @IsNotEmpty()
  readonly birthDate: string;

  @ApiProperty({ example: 'Av. Siempre Viva 123' })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({ example: 'juan@mail.com' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '+59170000000' })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({ example: 'Activo' })
  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty({ example: 'Tiempo completo' })
  @IsString()
  @IsNotEmpty()
  readonly time: string;

  @ApiProperty({ example: 'Proyecto Edge' })
  @IsString()
  @IsNotEmpty()
  readonly project: string;

  @ApiProperty({ example: 'Interno' })
  @IsString()
  @IsNotEmpty()
  readonly staffType: string;

  @ApiPropertyOptional({ example: 'Observacion interna' })
  @IsOptional()
  @IsString()
  readonly unnamed14?: string;

  @ApiProperty({ example: true })
  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  readonly contacted: boolean;

  @ApiProperty({ example: 'Supervisor Principal' })
  @IsString()
  @IsNotEmpty()
  readonly supervisor: string;

  @ApiProperty({ example: '2026-01-15' })
  @IsDateString()
  @IsNotEmpty()
  readonly entryDate: string;

  @ApiProperty({ example: 'Enero' })
  @IsString()
  @IsNotEmpty()
  readonly entryMonth: string;

  @ApiProperty({ example: '2026-03-15' })
  @IsDateString()
  @IsNotEmpty()
  readonly today: string;

  @ApiProperty({ example: 59 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly seniorityDays: number;

  @ApiProperty({ example: 'Senior' })
  @IsString()
  @IsNotEmpty()
  readonly level: string;

  @ApiProperty({ example: 'WPP-01' })
  @IsString()
  @IsNotEmpty()
  readonly wpp: string;

  @ApiProperty({ example: 'INV-01' })
  @IsString()
  @IsNotEmpty()
  readonly inv: string;

  @ApiPropertyOptional({ example: '2026-04-20' })
  @IsOptional()
  @IsDateString()
  readonly exitDate?: string;

  @ApiPropertyOptional({ example: 'Abril' })
  @IsOptional()
  @IsString()
  readonly exitMonth?: string;

  @ApiProperty({ example: 95 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly workedDays: number;

  @ApiPropertyOptional({ example: 'Fin de contrato' })
  @IsOptional()
  @IsString()
  readonly exitReason?: string;
}

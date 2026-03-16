import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHistoricalDataDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly rowNumber: number;

  @ApiProperty({ example: '2026-03-15' })
  @IsDateString()
  @IsNotEmpty()
  readonly submittedDate: string;

  @ApiProperty({ example: 'La Paz' })
  @IsString()
  @IsNotEmpty()
  readonly cityName: string;

  @ApiProperty({ example: 'Juan Perez' })
  @IsString()
  @IsNotEmpty()
  readonly auditorName: string;

  @ApiProperty({ example: 'PLACE-001' })
  @IsString()
  @IsNotEmpty()
  readonly placeId: string;

  @ApiProperty({ example: 6 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly purchaseDiaries: number;

  @ApiProperty({ example: 12 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly totalInvoiceCollected: number;

  @ApiProperty({ example: 9 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly totalPosCollected: number;
}

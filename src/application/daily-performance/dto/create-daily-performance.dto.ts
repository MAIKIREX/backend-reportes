import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDailyPerformanceDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly rowNumber: number;

  @ApiProperty({ example: 'Juan Perez' })
  @IsString()
  @IsNotEmpty()
  readonly auditorName: string;

  @ApiProperty({ example: '2026-03-15' })
  @IsDateString()
  @IsNotEmpty()
  readonly date: string;

  @ApiProperty({ example: 'La Paz Metropolitana' })
  @IsString()
  @IsNotEmpty()
  readonly metropolitanArea: string;

  @ApiProperty({ example: 'La Paz' })
  @IsString()
  @IsNotEmpty()
  readonly cityName: string;

  @ApiProperty({ example: 'USR-001' })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly visitsForRecruitment: number;

  @ApiProperty({ example: 4 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly posRecruited: number;

  @ApiProperty({ example: 8 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly visitsForInvoiceCollection: number;

  @ApiProperty({ example: '08:00:00' })
  @IsString()
  @IsNotEmpty()
  readonly firstTaskTime: string;

  @ApiProperty({ example: '17:00:00' })
  @IsString()
  @IsNotEmpty()
  readonly lastTaskTime: string;

  @ApiProperty({ example: 6 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly visitsWithInvoiceCollection: number;

  @ApiProperty({ example: 5 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly visitsWithInvoiceAndApprovedCensus: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly visitsWithInvoiceAndIncompleteCensus: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly visitsWithInvoiceAndRejectedCensus: number;

  @ApiProperty({ example: 2 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly visitsWithPendingQcCensus: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly visitsWithRejectedInvoiceAndApprovedCensus: number;

  @ApiProperty({ example: 3 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly approvedCensusCollectedInInvoiceBundle: number;

  @ApiProperty({ example: 40.5 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly recruitmentRate: number;

  @ApiProperty({ example: 7.5 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly timeInFormsHours: number;

  @ApiProperty({ example: 2.25 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly timeWalkingHours: number;

  @ApiProperty({ example: 75.2 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly invoiceCollectionRate: number;
}

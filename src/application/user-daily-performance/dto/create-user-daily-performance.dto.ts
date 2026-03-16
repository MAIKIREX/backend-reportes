import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDailyPerformanceDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly rowNumber: number;

  @ApiProperty({ example: '2026-03-15' })
  @IsDateString()
  @IsNotEmpty()
  readonly date: string;

  @ApiProperty({ example: 'La Paz Metropolitana' })
  @IsString()
  @IsNotEmpty()
  readonly metropolitanArea: string;

  @ApiProperty({ example: 'USR-001' })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ example: 'La Paz' })
  @IsString()
  @IsNotEmpty()
  readonly cityName: string;

  @ApiProperty({ example: 'Juan Perez' })
  @IsString()
  @IsNotEmpty()
  readonly auditorName: string;

  @ApiProperty({ example: 20 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly totalPos: number;

  @ApiProperty({ example: 15 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly approvedPos: number;

  @ApiProperty({ example: 2 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly partiallyRejectedPos: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly rejectedPos: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly inQcPos: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly incompletePos: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly refusalPos: number;

  @ApiProperty({ example: 5 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly visitedMicrozones: number;

  @ApiProperty({ example: '08:30:00' })
  @IsString()
  @IsNotEmpty()
  readonly firstTaskTime: string;

  @ApiProperty({ example: '17:10:00' })
  @IsString()
  @IsNotEmpty()
  readonly lastTaskTime: string;

  @ApiProperty({ example: 6.5 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly timeInFormsHours: number;

  @ApiProperty({ example: 1.75 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly timeWalkingHours: number;
}

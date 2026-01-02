import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';
import { Role } from '../../../core/auth/models/roles.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({ example: 'StrongP@ssw0rd', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
  @ApiProperty({ type: () => CreateProfileDto })
  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  readonly profile: CreateProfileDto;
  @ApiPropertyOptional({ enum: Role, example: Role.ADMIN })
  @IsEnum(Role)
  @IsOptional()
  readonly role?: Role;
}

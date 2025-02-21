import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'dev@rozedev.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'dev@rozedev.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsOptional()
  loginTries?: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}

export class FindByEmailDto {
  @ApiProperty({ example: 'dev@rozedev.com' })
  @IsEmail()
  email: string;
}

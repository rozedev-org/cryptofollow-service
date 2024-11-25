import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateInvestmentDto {
  @ApiProperty({ example: 0.00003634 })
  @IsNumber()
  buyPrice: number;
  @ApiProperty({ example: 2924485 })
  @IsNumber()
  currencyInvestment: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  currencyId: number;
}

export class UpdateInvestmentDto extends PartialType(CreateInvestmentDto) {}

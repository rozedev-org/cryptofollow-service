import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty({ example: 'BONK' })
  @IsString()
  name: string;
  @ApiProperty({ example: 0.00004286 })
  @IsNumber()
  price: number;
  @ApiProperty({ example: 'USDT' })
  @IsString()
  pair: string;
}

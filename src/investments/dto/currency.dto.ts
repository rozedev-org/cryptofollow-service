import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
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

export class UpdateCurrencyDtoWithId extends PartialType(CreateCurrencyDto) {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
}

export class UpdateCurrencyDto extends PartialType(CreateCurrencyDto) {}



export class GetCurrenciesDto extends PageOptionsDto {}

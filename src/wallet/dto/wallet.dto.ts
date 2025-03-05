import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetBalanceByCurrencyDto extends PageOptionsDto {
  @ApiProperty({ example: 'BONK' })
  @IsOptional()
  @IsString()
  currencyName?: string;
}

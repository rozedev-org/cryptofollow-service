import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class FindByIdDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  id: number;
}

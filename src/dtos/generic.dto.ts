import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class FindByIdDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number;
}

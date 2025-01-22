import { ApiProperty } from '@nestjs/swagger';

export class DefaultError {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}

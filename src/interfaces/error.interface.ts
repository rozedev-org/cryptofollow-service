import { ApiProperty } from '@nestjs/swagger';

export class DefaultErrorResponse {
  @ApiProperty({ example: 'Resource not found' })
  message: string;
  @ApiProperty({ example: 'Not Found' })
  error: string;
  @ApiProperty({ example: 404 })
  statusCode: number;
}

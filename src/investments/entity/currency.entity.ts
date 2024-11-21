import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';

export class CurrencyEntity implements Currency {
  constructor(currency: Currency) {
    this.id = currency.id;
    this.name = currency.name;
    this.price = currency.price;
  }

  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  pair: string;
  @ApiProperty()
  price: number;
}

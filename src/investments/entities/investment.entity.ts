import { ApiProperty } from '@nestjs/swagger';
import { Investment, Currency } from '@prisma/client';
import { Expose } from 'class-transformer';
import { CurrencyEntity } from './currency.entity';

export class InvestmentEntity implements Investment {
  constructor(investment: Investment, currency: Currency) {
    this.id = investment.id;
    this.buyPrice = investment.buyPrice;
    this.currencyInvestment = investment.currencyInvestment;
    this.currencyId = currency.id;
    this.currency = new CurrencyEntity(currency);
  }

  userId: number;

  @ApiProperty()
  id: number;
  @ApiProperty()
  buyPrice: number;
  @ApiProperty()
  currencyInvestment: number;
  @ApiProperty()
  currencyId: number;

  @ApiProperty()
  currency: CurrencyEntity;

  @Expose()
  @ApiProperty({ type: Number, readOnly: true })
  get pairInvestment() {
    return this.buyPrice * this.currencyInvestment;
  }

  @Expose()
  @ApiProperty({ type: Number, readOnly: true })
  get pairAmount() {
    return this.currencyInvestment * this.currency.price;
  }

  @Expose()
  @ApiProperty({ type: Number, readOnly: true })
  get pairVariation() {
    return this.pairAmount - this.pairInvestment;
  }

  @Expose()
  @ApiProperty({ type: Number, readOnly: true })
  get percentageVariation() {
    return (this.pairVariation / this.pairInvestment) * 100;
  }
}

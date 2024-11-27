import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEntity } from '../../investments/entities/currency.entity';

export class BalanceEntity {
  @ApiProperty()
  balance: number;
}

export class BalanceByCurrencyEntity {
  constructor({
    currencyInvestment,
    pairInvestment,
    pairAmount,
    pairVariation,
    percentageVariation,
    currencyId,
    currency,
  }: {
    currencyInvestment: number;
    pairInvestment: number;
    pairAmount: number;
    pairVariation: number;
    percentageVariation: number;
    currencyId: number;
    currency: CurrencyEntity;
  }) {
    this.currencyInvestment = currencyInvestment;
    this.pairInvestment = pairInvestment;
    this.pairAmount = pairAmount;
    this.pairVariation = pairVariation;
    this.percentageVariation = percentageVariation;
    this.currencyId = currencyId;
    this.currency = currency;
  }

  @ApiProperty()
  currencyInvestment: number;

  @ApiProperty()
  pairInvestment: number;

  @ApiProperty()
  pairAmount: number;

  @ApiProperty()
  pairVariation: number;

  @ApiProperty()
  percentageVariation: number;

  @ApiProperty()
  currencyId: number;

  @ApiProperty()
  currency: CurrencyEntity;
}

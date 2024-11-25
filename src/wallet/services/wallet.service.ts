import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { InvestmentEntity } from 'src/investments/entity/investment.entity';
import {
  BalanceByCurrencyEntity,
  BalanceEntity,
} from '../entity/wallet.entity';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(): Promise<BalanceEntity> {
    const invesments = await this.prisma.investment.findMany({
      include: { currency: true },
    });

    const formatedInvesment = invesments.map(
      (investment) => new InvestmentEntity(investment, investment.currency),
    );

    const balance = formatedInvesment.reduce(
      (acc, investment) => acc + investment.pairAmount,
      0,
    );

    return { balance };
  }

  async getBalanceByCurrencies() {
    const invesments = await this.prisma.investment.findMany({
      include: { currency: true },
    });

    let formatedInvesment = invesments.map(
      (investment) => new InvestmentEntity(investment, investment.currency),
    );

    formatedInvesment = formatedInvesment.reduce((acc, investment) => {
      const currencyIndex = acc.findIndex(
        (a) => a.currencyId === investment.currencyId,
      );

      if (currencyIndex === -1) {
        acc.push(investment);
        return acc;
      }

      acc[currencyIndex].currencyInvestment += investment.currencyInvestment;
      return acc;
    }, [] as InvestmentEntity[]);

    const balanceByCurrency = formatedInvesment.map((investment) => {
      return new BalanceByCurrencyEntity({
        currencyInvestment: investment.currencyInvestment,
        pairInvestment: investment.pairInvestment,
        pairAmount: investment.pairAmount,
        pairVariation: investment.pairVariation,
        percentageVariation:
          (investment.pairVariation / investment.pairInvestment) * 100,
        currencyId: investment.currencyId,
        currency: investment.currency,
      });
    });

    return balanceByCurrency;
  }
}

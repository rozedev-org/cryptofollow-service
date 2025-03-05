import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { InvestmentEntity } from 'src/investments/entities/investment.entity';
import {
  BalanceByCurrencyEntity,
  BalanceEntity,
} from '../entities/wallet.entity';
import { GetBalanceByCurrencyDto } from '../dto/wallet.dto';
import { CurrencyService } from '@app/investments/services/currency.service';
import { PageMetaDto } from '@common/dtos/page-meta.dto';

@Injectable()
export class WalletService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly currencyService: CurrencyService,
  ) {}

  async getBalance(userId: number): Promise<BalanceEntity> {
    const invesments = await this.prisma.investment.findMany({
      include: { currency: true },
      where: {
        userId,
      },
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

  async getBalanceByCurrencies(
    queryParams: GetBalanceByCurrencyDto,
    userId: number,
  ) {
    const { take, page, getAll } = queryParams;

    const invesments = await this.prisma.investment.findMany({
      include: { currency: true },
      where: {
        userId,
      },
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
      console.log('investment :>> ', investment);
      console.log('investment :>> ', investment.pairVariation);

      return new BalanceByCurrencyEntity({
        currencyInvestment: investment.currencyInvestment,
        pairInvestment: investment.pairInvestment,
        pairAmount: investment.pairAmount,
        pairVariation: investment.pairVariation,
        percentageVariation: investment.percentageVariation,
        currencyId: investment.currencyId,
        currency: investment.currency,
      });
    });

    const itemCount = balanceByCurrency.length;
    const pageMetaDto = new PageMetaDto({
      itemCount: itemCount,
      pageOptionsDto: {
        ...queryParams,
        take: getAll ? itemCount : queryParams.take,
      },
    });

    const start = (page - 1) * take;
    const end = start + take;

    return {
      data: getAll ? balanceByCurrency : balanceByCurrency.slice(start, end),
      meta: pageMetaDto,
    };
  }
}

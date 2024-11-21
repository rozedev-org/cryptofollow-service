import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { InvestmentEntity } from '../entity/investment.entity';
import { CreateInvestmentDto } from '../dto/investments.dto';
import { CurrencyService } from './currency.service';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly currencyService: CurrencyService,
  ) {}

  async investments() {
    const data = await this.prisma.investment.findMany();

    if (data.length) {
      const currencies = await this.currencyService.currencies();
 c                                      1                    2                
      return data.map((investment) => {
        const currency = currencies.find(
          (currency) => currency.id === investment.currencyId,
        );

        if (!currency) return;

        return new InvestmentEntity(investment, currency);
      });
    }
  }

  async create(data: CreateInvestmentDto) {
    return this.prisma.investment.create({
      data: {
        buyPrice: data.buyPrice,
        currencyInvestment: data.currencyInvestment,
        currencyId: data.currencyId,
      },
    });
  }
}

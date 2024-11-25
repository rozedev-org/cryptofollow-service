import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { InvestmentEntity } from '../entity/investment.entity';
import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from '../dto/investments.dto';
import { CurrencyService } from './currency.service';
import { BinanceUtils } from '../utils/binance.util';
import { FindByIdDto } from '../../dtos/generic.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly currencyService: CurrencyService,
    private readonly binanceUtils: BinanceUtils,
  ) {}

  async investments() {
    // Fetch all investment records from the database using Prisma
    const data = await this.prisma.investment.findMany();

    // Check if any investment records exist
    if (data.length) {
      // Extract unique currency IDs from the investment data
      const uniqueCurrencyIds = [
        ...new Set(data.map((investment) => investment.currencyId)),
      ];

      // Fetch currency details for the unique currency IDs
      const currencies =
        await this.currencyService.findByIds(uniqueCurrencyIds);

      // Create an array of currency names paired with their symbols (e.g., BTCUSDT)
      const curreniesNames = currencies.map(
        (currency) => `${currency.name}${currency.pair}`,
      );

      // Retrieve the current prices for the currencies from Binance
      const prices =
        await this.binanceUtils.getCurrenciesPriceByNames(curreniesNames);

      // Update each currency object with its latest price
      currencies.forEach((currency) => {
        const price = prices.find(
          (price) => price.symbol === `${currency.name}${currency.pair}`,
        );

        if (price) {
          // Convert the price to a number and assign it to the currency
          currency.price = Number(price.price);
        }
      });

      // Update the database with the latest prices for the currencies
      await this.currencyService.updateManyWitIds(currencies);

      // Map the investment data to include currency details and return it
      return data.map((investment) => {
        // Find the associated currency for the investment
        const currency = currencies.find(
          (currency) => currency.id === investment.currencyId,
        );

        if (!currency) return;

        // Create and return a new InvestmentEntity object with investment and currency details
        return new InvestmentEntity(investment, currency);
      });
    }
  }

  async findById({ id }: FindByIdDto) {
    const data = await this.prisma.investment.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException(`Investment ${id} not found`);
    }

    const currency = await this.currencyService.findById({
      id: data.currencyId,
    });

    if (!currency) {
      throw new NotFoundException(`Currency ${data.currencyId} not found`);
    }

    const price = await this.binanceUtils.getCurrencyByName(
      `${currency.name}/${currency.pair}`,
    );

    currency.price = Number(price.price);
    await this.currencyService.update({ id: currency.id }, currency);

    return new InvestmentEntity(data, currency);
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

  async update({ id }: FindByIdDto, payload: UpdateInvestmentDto) {
    await this.findById({ id });
    return this.prisma.investment.update({
      where: { id },
      data: payload,
    });
  }

  async delete({ id }: FindByIdDto) {
    await this.findById({ id });
    return this.prisma.investment.delete({ where: { id } });
  }
}

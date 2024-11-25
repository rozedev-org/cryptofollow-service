import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PriceTickerResponse } from './binance.utils.interface';

@Injectable()
export class BinanceUtils {
  constructor(private readonly httpService: HttpService) {}

  async getCurrenciesPriceByNames(currencies: string[]) {
    const prices: PriceTickerResponse[] = [];

    for await (const currency of currencies) {
      const data = await this.getCurrencyByName(currency);

      prices.push(data);
    }

    return prices;
  }

  async getCurrencyByName(currency: string) {
    const response = await lastValueFrom(
      this.httpService.get<PriceTickerResponse>(
        `https://api.binance.com/api/v3/ticker/price?symbol=${currency}`,
      ),
    );

    return response.data;
  }
}

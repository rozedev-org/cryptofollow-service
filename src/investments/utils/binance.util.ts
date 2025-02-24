import config from '@app/config';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { PriceTickerResponse } from './binance.utils.interface';
import { GetBinanceTickerPriceDto } from '../dto/currency.dto';

@Injectable()
export class BinanceUtils {
  constructor(
    private readonly httpService: HttpService,

    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async getCurrenciesPriceByNames(currencies: string[]) {
    const prices: PriceTickerResponse[] = [];

    for await (const currency of currencies) {
      const data = await this.getCurrencyByName(currency);

      prices.push(data);
    }

    return prices;
  }

  async getCurrencyByName(currency: string) {
    const { host } = this.configService.binance;
    const response = await lastValueFrom(
      this.httpService.get<PriceTickerResponse>(
        `${host}/api/v3/ticker/price?symbol=${currency}`,
      ),
    );
    return response.data;
  }
  catch(error: any) {
    console.log('error :>> ', error);
    throw new Error('Failed to fetch currency price');
  }

  async getPriceTicker({ symbol }: GetBinanceTickerPriceDto) {
    try {
      const { host } = this.configService.binance;
      // const queryParams = `${symbol ? `symbol=${symbol}` : ''}`;
     
      const response = await lastValueFrom(
        this.httpService.get<PriceTickerResponse[]>(
          `${host}/api/v3/ticker/price`,
        ),
      );

      return response.data;
    } catch (error: any) {
      console.log('error :>> ', error);
      throw new Error('Failed to fetch currency price');
    }
  }
}

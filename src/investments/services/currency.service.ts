import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateCurrencyDto,
  GetBinanceTickerPriceDto,
  GetCurrenciesDto,
  UpdateCurrencyDto,
  UpdateCurrencyDtoWithId,
} from '../dto/currency.dto';
import { FindByIdDto } from '../../dtos/generic.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { BinanceUtils } from '../utils/binance.util';
import { WebSocket } from 'ws';
@Injectable()
export class CurrencyService implements OnModuleInit {
  private ws: WebSocket;
  private readonly logger = new Logger(CurrencyService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly binanceUtils: BinanceUtils,
  ) {}

  async onModuleInit() {
    this.connectWebSocket();
  }

  private connectWebSocket() {
    this.ws = new WebSocket('wss://stream.binance.com:9443/ws');

    this.ws.on('open', async () => {
      this.logger.log('Conectado a Binance WebSocket');
      await this.subscribeToPrices();
    });

    this.ws.on('message', async (data: string) => {
      const message = JSON.parse(data);
      if (message.s && message.c) {
        await this.updatePrice(message.s, parseFloat(message.c));
      }
    });

    this.ws.on('close', () => {
      this.logger.warn('WebSocket cerrado. Reintentando conexión en 5s...');
      setTimeout(() => this.connectWebSocket(), 5000);
    });

    this.ws.on('error', (error) => {
      this.logger.error(`Error en WebSocket: ${error.message}`);
    });
  }

  private async subscribeToPrices() {
    const symbols = await this.prisma.currency.findMany();

    const msg = {
      method: 'SUBSCRIBE',
      params: symbols.map(
        (symbol) =>
          `${symbol.name.toLocaleLowerCase()}${symbol.pair.toLocaleLowerCase()}@ticker`,
      ),
      id: 1,
    };
    this.ws.send(JSON.stringify(msg));
  }

  private async updatePrice(symbol: string, price: number) {
    const currencyName = symbol.replace('USDT', '').toUpperCase(); // Extraer nombre BONK de BONKUSDT
    try {
      await this.prisma.currency.update({
        where: { name: currencyName.toUpperCase() },
        data: { price },
      });
    } catch (error) {
      this.logger.error(`Error actualizando ${currencyName}: ${error.message}`);
    }
  }

  async getBinanceTickerPrice({ symbol }: GetBinanceTickerPriceDto) {
    const currencies = await this.binanceUtils.getPriceTicker({ symbol });

    return currencies.filter((currency) => currency.symbol.includes('USDT'));
  }

  async currencies(queryParams: GetCurrenciesDto) {
    const { take, page, getAll } = queryParams;

    const querySpecs = !getAll
      ? {
          take,
          skip: (page - 1) * take,
        }
      : undefined;

    const data = await this.prisma.currency.findMany({
      ...querySpecs,
    });

    const itemCount = await this.prisma.currency.count();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: {
        ...queryParams,
        take: getAll ? itemCount : queryParams.take,
      },
    });

    return {
      data,
      meta: pageMetaDto,
    };
  }

  async findById({ id }: FindByIdDto) {
    const data = await this.prisma.currency.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new NotFoundException(`Currency ${id} not found`);
    }
    return data;
  }

  async create(data: CreateCurrencyDto) {
    return this.prisma.currency.create({
      data: {
        name: data.name,
        price: data.price,
        pair: data.pair,
      },
    });
  }

  async findByIds(ids: number[]) {
    const data = await this.prisma.currency.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return data;
  }

  async update({ id }: FindByIdDto, data: UpdateCurrencyDto) {
    await this.findById({ id });

    return this.prisma.currency.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async updateManyWitIds(data: UpdateCurrencyDtoWithId[]) {
    return Promise.all(
      data.map((currency) => {
        return this.prisma.currency.update({
          where: {
            id: currency.id,
          },
          data: {
            name: currency.name,
            price: currency.price,
            pair: currency.pair,
          },
        });
      }),
    );
  }

  async delete({ id }: FindByIdDto) {
    await this.findById({ id });

    return this.prisma.currency.delete({
      where: {
        id: id,
      },
    });
  }
}

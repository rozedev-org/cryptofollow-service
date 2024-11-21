import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCurrencyDto } from '../dto/currency.dto';
import { FindByIdDto } from '../../dtos/generic.dto';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async currencies() {
    const data = await this.prisma.currency.findMany();
    console.log(data);
    return data;
  }

  async currency({ id }: FindByIdDto) {
    const data = await this.prisma.currency.findUnique({
      where: {
        id: id,
      },
    });
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
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateCurrencyDto,
  UpdateCurrencyDto,
  UpdateCurrencyDtoWithId,
} from '../dto/currency.dto';
import { FindByIdDto } from '../../dtos/generic.dto';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async currencies() {
    const data = await this.prisma.currency.findMany();
    return data;
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

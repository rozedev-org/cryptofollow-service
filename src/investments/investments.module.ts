import { Module } from '@nestjs/common';
import { InvestmentsService } from './services/investments.service';
import { InvestmentsController } from './controllers/investments.controller';
import { PrismaModule } from '../database/prisma.module';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';
import { BinanceUtils } from './utils/binance.util';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [InvestmentsService, CurrencyService, BinanceUtils],
  controllers: [InvestmentsController, CurrencyController],
})
export class InvestmentsModule {}

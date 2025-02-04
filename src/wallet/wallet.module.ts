import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { PrismaModule } from '../database/prisma.module';
import { CurrencyService } from '@app/investments/services/currency.service';
import { BinanceUtils } from '@app/investments/utils/binance.util';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [WalletController],
  providers: [WalletService, CurrencyService, BinanceUtils],
})
export class WalletModule {}

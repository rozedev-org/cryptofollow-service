import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { PrismaModule } from '../database/prisma.module';
import { CurrencyService } from '@app/investments/services/currency.service';

@Module({
  imports: [PrismaModule],
  controllers: [WalletController],
  providers: [WalletService, CurrencyService],
})
export class WalletModule {}

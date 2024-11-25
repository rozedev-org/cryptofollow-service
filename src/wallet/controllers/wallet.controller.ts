import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletService } from '../services/wallet.service';
import {
  BalanceByCurrencyEntity,
  BalanceEntity,
} from '../entity/wallet.entity';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @ApiOkResponse({ type: BalanceEntity })
  getBalance() {
    return this.walletService.getBalance();
  }

  @Get('currencies')
  @ApiOkResponse({ type: BalanceByCurrencyEntity, isArray: true })
  getBalanceByCurrencies() {
    return this.walletService.getBalanceByCurrencies();
  }
}

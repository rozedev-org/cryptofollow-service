import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletService } from '../services/wallet.service';
import {
  BalanceByCurrencyEntity,
  BalanceEntity,
} from '../entities/wallet.entity';
import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { GetBalanceByCurrencyDto } from '../dto/wallet.dto';

@ApiTags('wallet')
@UseGuards(JwtAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @ApiOkResponse({ type: BalanceEntity })
  getBalance() {
    return this.walletService.getBalance();
  }

  @Get('currencies')
  // @ApiOkResponse({ type: BalanceByCurrencyEntity, isArray: true })
  getBalanceByCurrencies(@Query() queryParams: GetBalanceByCurrencyDto) {
    return this.walletService.getBalanceByCurrencies(queryParams);
  }
}

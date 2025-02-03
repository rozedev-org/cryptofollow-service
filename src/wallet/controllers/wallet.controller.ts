import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletService } from '../services/wallet.service';
import {
  BalanceByCurrencyEntity,
  BalanceEntity,
} from '../entities/wallet.entity';
import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { GetBalanceByCurrencyDto } from '../dto/wallet.dto';
import { Request } from 'express';
import { PayloadToken } from '@app/auth/models/token.model';

@ApiTags('wallet')
@UseGuards(JwtAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @ApiOkResponse({ type: BalanceEntity })
  getBalance(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.walletService.getBalance(user.sub);
  }

  @Get('currencies')
  // @ApiOkResponse({ type: BalanceByCurrencyEntity, isArray: true })
  getBalanceByCurrencies(
    @Query() queryParams: GetBalanceByCurrencyDto,
    @Req() req: Request,
  ) {
    const user = req.user as PayloadToken;

    return this.walletService.getBalanceByCurrencies(queryParams, user.sub);
  }
}

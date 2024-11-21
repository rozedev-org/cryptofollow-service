import { Body, Controller, Post } from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';
import { CreateCurrencyDto } from '../dto/currency.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  createCurrency(@Body() payload: CreateCurrencyDto) {
    return this.currencyService.create(payload);
  }
}

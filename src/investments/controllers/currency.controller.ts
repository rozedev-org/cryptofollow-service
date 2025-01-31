import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';
import { CreateCurrencyDto, GetCurrenciesDto, UpdateCurrencyDto } from '../dto/currency.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindByIdDto } from '../../dtos/generic.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';

@ApiTags('currency')
@UseGuards(JwtAuthGuard)
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  getCurrencies(@Query() queryParams: GetCurrenciesDto) {
    return this.currencyService.currencies(queryParams);
  }

  @Get(':id')
  getCurrencyById(@Param() params: FindByIdDto) {
    return this.currencyService.findById(params);
  }

  @Post()
  createCurrency(@Body() payload: CreateCurrencyDto) {
    return this.currencyService.create(payload);
  }

  @Put(':id')
  updateCurrency(
    @Param() params: FindByIdDto,
    @Body() payload: UpdateCurrencyDto,
  ) {
    return this.currencyService.update(params, payload);
  }

  @Delete(':id')
  deleteCurrency(@Param() params: FindByIdDto) {
    return this.currencyService.delete(params);
  }
}

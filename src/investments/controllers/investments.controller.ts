import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvestmentsService } from '../services/investments.service';
import { CreateInvestmentDto } from '../dto/investments.dto';
import { FindByIdDto } from 'src/dtos/generic.dto';

@ApiTags('investments')
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Get()
  getInvestments() {
    return this.investmentsService.investments();
  }

  @Get(':id')
  getInvestment(@Param() params: FindByIdDto) {
    return this.investmentsService.findById(params);
  }

  @Post()
  createInvestment(@Body() payload: CreateInvestmentDto) {
    return this.investmentsService.create(payload);
  }

  @Put(':id')
  updateInvestment(
    @Param() params: FindByIdDto,
    @Body() payload: CreateInvestmentDto,
  ) {
    return this.investmentsService.update(params, payload);
  }

  @Delete(':id')
  deleteInvestment(@Param() params: FindByIdDto) {
    return this.investmentsService.delete(params);
  }
}

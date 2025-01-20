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
import { ApiTags } from '@nestjs/swagger';
import { InvestmentsService } from '../services/investments.service';
import { CreateInvestmentDto, GeInvestmentsDto } from '../dto/investments.dto';
import { FindByIdDto } from 'src/dtos/generic.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';

@ApiTags('investments')
@UseGuards(JwtAuthGuard)
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  // @ApiOkResponsePaginated(InvestmentEntity)
  @Get()
  getInvestments(@Query() queryParams: GeInvestmentsDto) {
    return this.investmentsService.investments(queryParams);
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

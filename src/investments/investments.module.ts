import { Module } from '@nestjs/common';
import { InvestmentsService } from './services/investments.service';
import { InvestmentsController } from './controllers/investments.controller';
import { PrismaModule } from '../database/prisma.module';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';

@Module({
  imports: [PrismaModule],
  providers: [InvestmentsService, CurrencyService],
  controllers: [InvestmentsController, CurrencyController],
})
export class InvestmentsModule {}

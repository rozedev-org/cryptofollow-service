import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvestmentsModule } from './investments/investments.module';
import { PrismaModule } from './database/prisma.module';
import { WalletModule } from './wallet/wallet.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    // PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        POSTMAN_COLLECTION_ID: Joi.string().required(),
        POSTMAN_API_KEY: Joi.string().required(),
        POSTMAN_HOST: Joi.string().required(),
        ON_UPDATE_POSTMAN_COLLECTION: Joi.boolean().required(),
        BINANCE_HOST: Joi.string().required(),
      }),
    }),
    InvestmentsModule,
    PrismaModule,
    WalletModule,
    UsersModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

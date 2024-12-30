import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { updatePostmanCollection } from './utils/postman/index.util';
import config from './config';

async function bootstrap() {
  const { appPort, postmant } = config();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/cryptofollow-service/v1');

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Crypto Follow Service')
    .setDescription('Service of Crypto Follow')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({ credentials: true, origin: true });

  fs.writeFileSync('./swagger.json', JSON.stringify(document));

  await app.listen(appPort ?? 3000);

  if (
    postmant.onUpdatePostmanCollection &&
    postmant.apiKey &&
    postmant.collectionId &&
    postmant.host
  ) {
    updatePostmanCollection({
      swagger: document,
      apiKey: postmant.apiKey,
      collectionId: postmant.collectionId,
      host: postmant.host,
    });
  }
}

bootstrap();

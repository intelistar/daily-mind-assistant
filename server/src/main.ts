import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT ?? 5050;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true, // выбрасывает ошибку, если пришли лишние поля
      transform: true,
      transformOptions: { enableImplicitConversion: true }, // преобразует типы (например, "1" → 1)
    }),
  );

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
start();

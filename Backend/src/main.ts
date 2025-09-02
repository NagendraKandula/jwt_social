import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (allow requests from frontend)
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,               // If you're using cookies or auth headers
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();

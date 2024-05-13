import { NestFactory } from '@nestjs/core';
import { bootstrapApp } from '@sheez/server';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false
  });
  await bootstrapApp(app, 'Engineering', 'api');
}

bootstrap();

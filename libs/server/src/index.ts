import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function generateNestApp(
  app: INestApplication,
  name: string,
  globalPrefix: 'api'
): Promise<void> {
  const appExpress = app as NestExpressApplication;
  appExpress.enableShutdownHooks()
  app
    .setGlobalPrefix(globalPrefix)
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
      prefix: false,
    })
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
        exceptionFactory: (errors) => {
          const message = errors.map((error) => {
            return error.constraints;
          });
          return new BadRequestException(message);
        },
      })
    );

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(`${name} API description`)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

export async function bootstrapApp(
  app: INestApplication,
  name: string,
  globalPrefix: 'api'
): Promise<void> {
  const port = 8080;
  await generateNestApp(app, name, globalPrefix);

  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

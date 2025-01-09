import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetup } from './swagger/swagger-setup';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/exceptions.filter';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allExceptionsFilter = app.get(AllExceptionsFilter);
  app.get<SwaggerSetup>(SwaggerSetup).setSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true
    })
  );
  app.useGlobalFilters(allExceptionsFilter);
  await app.listen(3000);
})();

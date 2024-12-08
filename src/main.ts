import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigServiceExtended } from './config/config.service';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validate environment variables
  const configService = app.get(ConfigServiceExtended);
  configService.load(); // Validate the environment variables here
  const logger = new Logger('Bootstrap');

  const options = new DocumentBuilder()
    .setTitle('Ride Hailing API')
    .setDescription('The ride-hailing app API description')
    .setVersion('1.0')
    .addTag('customers')
    .addTag('drivers')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  //const port = configService.get('PORT'); // Access the PORT
  await app.listen(5555); // Listen on the port
}
bootstrap();

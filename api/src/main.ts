import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/home/ochi/secrets/privkey.pem'),
    cert: fs.readFileSync('/home/ochi/secrets/cert.pem'),
    ca: fs.readFileSync('/home/ochi/secrets/chain.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  //const app = await NestFactory.create(AppModule);

  // url http://localhost:3000/
  app.use('/', express.static('../web'));

  // url http://localhost:3000/api/
  const options = new DocumentBuilder().setTitle('CalenderAPI(雑なネーミングは後々後悔する)').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

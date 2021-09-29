/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ListModule } from './bribes/list.module';

const hostname = 'localhost';
const port = 4000;

async function bootstrap() {
  const app = await NestFactory.create(ListModule);
  app.enableCors({allowedHeaders: ["*"]})
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}
bootstrap();

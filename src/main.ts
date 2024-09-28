import { NestFactory } from '@nestjs/core';
import { AppModule } from './entities_global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
}
bootstrap();

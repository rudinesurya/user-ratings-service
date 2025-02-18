import { NestFactory } from '@nestjs/core';
import { UserRatingsModule } from './user-ratings.module';

async function bootstrap() {
  const app = await NestFactory.create(UserRatingsModule);
  await app.listen(3000);
}
bootstrap();

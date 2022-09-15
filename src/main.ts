import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { PopulateUser } from './helpers/populateUser';
import { UsersService } from './modules/users/users.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.use(cookieParser());

  const userService = app.get(UsersService);
  const populateUser = new PopulateUser(userService);

  app.use(populateUser.populateUserCookie);

  app.setGlobalPrefix('api');
  await app.listen(5000);
}
bootstrap();
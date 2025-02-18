import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRatingsController } from './user-ratings.controller';
import { UserRatingsService } from './services/user-ratings.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ConfigService } from './services/config/config.service';
import { UserRatingSchema } from './schemas/user-rating.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'User Rating',
        schema: UserRatingSchema,
        collection: 'user-ratings',
      },
    ]),
  ],
  controllers: [UserRatingsController],
  providers: [
    UserRatingsService,
    ConfigService,
  ],
})
export class UserRatingsModule {}

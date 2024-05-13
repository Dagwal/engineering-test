import { UserController } from './modules/user/controller/user.controller';
import { ParcController } from './modules/parc/controller/parc.controller';
import { BookingController } from './modules/booking/controller/booking.controller';
import { UserService } from './modules/user/service/user.service';
import { ParcService } from './modules/parc/service/parc.service';
import { BookingService } from './modules/booking/service/booking.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigOptions } from './config';
import { UserModel } from './entities/user.model';
import { BookingModel } from './entities/booking.model';
import { ParcModel } from './entities/parc.model';
import { CommentModel } from './entities/comment.model';

console.log('ConfigOptions', ConfigOptions)

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigOptions),
    TypeOrmModule.forFeature([UserModel, ParcModel, BookingModel, CommentModel])
  ],
  controllers: [UserController, ParcController, BookingController],
  providers: [UserService, ParcService, BookingService],
})
export class AppModule {}

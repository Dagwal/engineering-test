import {TypeOrmModuleOptions} from "@nestjs/typeorm"
import { BookingModel } from "./entities/booking.model";
import {ParcModel} from "./entities/parc.model";
import {UserModel} from "./entities/user.model";
import { CommentModel } from "./entities/comment.model";

export const ConfigOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sheez_api',
  entities: [BookingModel, ParcModel, UserModel, CommentModel],
  synchronize: true,
  maxQueryExecutionTime: 1000,
  keepConnectionAlive: true
}

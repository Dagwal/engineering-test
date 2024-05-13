import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { BookingModel } from "./src/entities/booking/booking.model";
import { ParcModel } from "./src/entities/parc/parc.model";
import { UserModel } from "./src/entities/user/user.model";

export const ConfigOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'sheez-db',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'sheez_api',
  entities: [BookingModel, ParcModel, UserModel],
  synchronize: true,
  maxQueryExecutionTime: 1000,
  keepConnectionAlive: true
}

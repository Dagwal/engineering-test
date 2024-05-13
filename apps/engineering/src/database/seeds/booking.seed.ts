import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { BookingModel } from "../../entities/booking.model";

export class BookingFakeSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(BookingModel)().createMany(10)
  }
}

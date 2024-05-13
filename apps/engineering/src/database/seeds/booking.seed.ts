import { Factory, Seeder } from "typeorm-seeding";
import { BookingModel } from "../../entities/booking.model";

export class BookingFakeSeed implements Seeder {
  async run(factory: Factory): Promise<any> {
    await factory(BookingModel)().createMany(10)
  }
}

import { define } from "typeorm-seeding";
import { BookingModel } from "../../entities/booking.model";

define(BookingModel, (faker) => {
  const booking = new BookingModel;

  booking.id = faker.random.uuid();
  booking.user = faker.random.uuid();
  booking.parc = faker.random.uuid();
  booking.bookingdate = faker.date.past().toISOString();
  booking.comments = faker.lorem.sentence();

  return booking
})

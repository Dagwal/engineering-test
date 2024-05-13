import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingModel } from 'apps/engineering/src/entities/booking.model';
import { AllBookingResponseContract, BookingRequestContract } from '../dto/booking.contracts';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingModel)
    private readonly bookingRepository: Repository<BookingModel>,
  ) {}

  async findAllBookingsAndFormat(): Promise<AllBookingResponseContract> {
    const bookings = await this.bookingRepository.find();
    const formattedBookings = bookings.map((booking) => ({
      id: booking.id,
      user: booking.user,
      parc: booking.parc,
      bookingdate: booking.bookingdate,
      comments: booking.comments,
    }));

    return { data: formattedBookings };
  }

  async getBookingById(id: string): Promise<BookingModel> {
    const bookingById =  await this.bookingRepository.findOne({where: {id}});
    if (!bookingById) {
      throw new NotFoundException('Booking not found');
    }
    return bookingById;
  }

  async newBooking(booking: BookingRequestContract): Promise<BookingModel> {
    try {
      const newBooking = this.bookingRepository.create(booking);
      await this.bookingRepository.save(newBooking);
      return newBooking;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeBooking(id: string): Promise<void> {
    try {
      const booking = await this.getBookingById(id);
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      await this.bookingRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

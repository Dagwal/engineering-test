import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingModel } from 'apps/engineering/src/entities/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingModel)
    private readonly bookingRepository: Repository<BookingModel>,
  ) {}

  async findAllBookings(): Promise<BookingModel[]> {
    return await this.bookingRepository.find();
  }

  async getBookingById(id: string): Promise<BookingModel> {
    return await this.bookingRepository.createQueryBuilder().select().where('id = :id', {id}).getOne();
  }

  async newBooking(booking: BookingModel): Promise<BookingModel> {
    return await this.bookingRepository.save(booking);
  }

  async removeBooking(id: string): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}

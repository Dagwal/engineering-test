import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { uuid } from 'uuidv4';
import { FlakeyApiInterceptor } from '../../../flakey-api.interceptor';
import {
  AllBookingResponseContract,
  BookingRequestContract,
  BookingResponseDto,
} from '../dto/booking.contracts';
import { BookingModel } from '../../../entities/booking.model';

import { BookingService } from '../service/booking.service';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOkResponse({ type: AllBookingResponseContract })
  @Get()
  @UseInterceptors(new FlakeyApiInterceptor(0.9))
  async findAll(): Promise<AllBookingResponseContract> {
    const bookings = await this.bookingService.findAllBookings();

    return {
      data: bookings.map((booking) => ({
        id: booking.id,
        user: booking.user,
        parc: booking.parc,
        bookingdate: booking.bookingdate,
        comments: booking.comments,
      })),
    };
  }

  @ApiCreatedResponse({ type: AllBookingResponseContract })
  @ApiBadRequestResponse()
  @Post()
  async create(
    @Body() payload
  ): Promise<BookingResponseDto> {
    // create new booking
    const booking = await this.bookingService.newBooking({
      ...payload,
      id: uuid()
    } as BookingModel);

    return booking;
  }

  @Get(':id')
  @ApiOkResponse({ type: BookingResponseDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async getBooking(@Param('id') id: string): Promise<BookingResponseDto> {
    const booking = await this.bookingService.getBookingById(id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  @Delete(':id')
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.bookingService.removeBooking(id);
    return;
  }
}

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
    return await this.bookingService.findAllBookingsAndFormat();
  }

  @ApiCreatedResponse({ type: AllBookingResponseContract })
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() book: BookingRequestContract): Promise<BookingResponseDto> {
    return await this.bookingService.newBooking(book);
  }


  @Get(':id')
  @ApiOkResponse({ type: BookingResponseDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async getBooking(@Param('id') id: string): Promise<BookingResponseDto> {
    return await this.bookingService.getBookingById(id);
  }

  @Delete(':id')
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.bookingService.removeBooking(id);
  }
}

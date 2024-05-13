import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "../../../entities/booking.model";
import { UserModel } from "apps/engineering/src/entities/user.model";
import { ParcModel } from "apps/engineering/src/entities/parc.model";
import { CommentModel } from "apps/engineering/src/entities/comment.model";

export class BookingResponseDto implements Booking {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  user!: UserModel;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  parc: ParcModel;

  @ApiProperty()
  bookingdate: string;

  @ApiProperty()
  comments?: CommentModel[];
}

export class AllBookingResponseContract {
  @ApiProperty({isArray: true, type: AllBookingResponseContract })
  data!: Booking[];
}

export class BookingRequestContract {
  @ApiProperty()
  user: UserModel;

  @ApiProperty()
  parc: ParcModel;

  @ApiProperty()
  bookingdate: string;

  @ApiProperty()
  comments?: CommentModel[];
}

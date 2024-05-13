import { ApiProperty } from "@nestjs/swagger";
import { User } from "apps/engineering/src/entities/user.model";

export class UserResponseDto implements User {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;
}

export class AllUserResponseContract {
  @ApiProperty({isArray: true, type: AllUserResponseContract })
  data!: User[];
}

export class CreateUserContract {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;
}

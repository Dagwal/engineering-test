import { ApiProperty } from "@nestjs/swagger";
import { Parc } from "apps/engineering/src/entities/parc.model";

export class ParcResponseDto implements Parc {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

export class AllParcResponseContract {
  @ApiProperty({isArray: true, type: AllParcResponseContract })
  data!: Parc[];
}

export class ParcRequestContract {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

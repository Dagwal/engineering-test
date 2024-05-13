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
  AllParcResponseContract,
  ParcRequestContract,
  ParcResponseDto,
} from '../dto/parc.contracts';
import { ParcModel } from '../../../entities/parc.model';

import { ParcService } from '../service/parc.service';

@ApiTags('parcs')
@Controller('parcs')
export class ParcController {
  constructor(private readonly parcService: ParcService) {}

  @ApiOkResponse({ type: AllParcResponseContract })
  @Get()
  async findAll(): Promise<AllParcResponseContract> {
    const parcs = await this.parcService.findAll();

    return {
      data: parcs.map((parc) => ({
        id: parc.id,
        name: parc.name,
        description: parc.description,
      })),
    };
  }

  @ApiCreatedResponse({ type: AllParcResponseContract })
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() payload: {name: string, description: string}): Promise<ParcResponseDto> {
    const parc = await this.parcService.newUser({
      id: uuid(),
      name: payload.name,
      description: payload.description,
    } as ParcModel);

    return parc
  }

  @Get(':id')
  @ApiOkResponse({ type: ParcResponseDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(new FlakeyApiInterceptor(0.7))
  async getParc(@Param('id') id: string): Promise<ParcResponseDto> {
    const parc = await this.parcService.getById(id);

    if (!parc) {
      throw new NotFoundException('Parc not found');
    }

    return parc;
  }

  @Delete(':id')
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.parcService.remove(id);

    return;
  }
}
